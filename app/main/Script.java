package main;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import models.Recipe;
import models.RecipeAkka;
import play.Logger;
import scala.concurrent.duration.Duration;

import com.avaje.ebean.Ebean;

import controllers.Scheduler;
import controllers.StdRandom;
import controllers.SystemController;
import controllers.Scheduler.CancellableRef;
import controllers.Scheduler.RandomPeriodFactory;
import controllers.Scheduler.StopCriteria;

public class Script {
	
	/**
	 * Iterates through all the recipes that we have and launch their triggers
	 */
	public static void random() {
		/*
		 * This is how we send a message.
		 */

		for (Recipe recipe : Ebean.find(Recipe.class).findList()) {
			// We just declare something well use later on.
			System.out.println("recipe launched");
			CancellableRef cancellableRef = null;
			if (recipe == null) {
				Logger.info("No recipes are available.");
			} else {
				SystemController.userGroupActorRouterMap.get(
						recipe.getUser().getUserGroup()).tell(
						RecipeAkka.recipesMap.get(recipe.getId())
								.getTriggerMessage(),
						RecipeAkka.recipesMap.get(recipe.getId())
								.getTriggerChannelActor());

				/**
				 * This is the simple way to set up a random message issue.
				 * Activate it every random period between 10 and 15 seconds,
				 * and never stops. First we implement an object whose method
				 * will give us a new random duration each time it's invoked.
				 * Then, we pass this implementation to the scheduler.
				 */
				RandomPeriodFactory randomPeriodFactory = new RandomPeriodFactory() {
					@Override
					public Duration getPeriod() {
						return Duration.create(StdRandom.uniform(10, 15),
								TimeUnit.SECONDS);
					}
				};
				cancellableRef = SystemController.scheduler
						.periodicallyActivate(randomPeriodFactory,
								Scheduler.StopCriteria.set(StopCriteria.NEVER,
										null), recipe);
			}

			/**
			 * We can do anything we want upon a trigger raising. Here, at most
			 * 5 seconds after the previous event we'll do something. We've
			 * chosen to activate a random recipe and to say hello to the
			 * logger. After 15 times, we stop it and go to sleep.
			 * 
			 * The object eventRunnable is an anonymous implementation of the
			 * interface Runnable. We pass this object to the scheduler. Thus,
			 * each time a issue is raised, we start this thread.
			 */
			RandomPeriodFactory randomPeriodFactory = new RandomPeriodFactory() {
				@Override
				public Duration getPeriod() {
					return Duration.create(StdRandom.uniform(5),
							TimeUnit.SECONDS);
				}
			};
			Runnable eventRunnable = new Runnable() {
				@Override
				public void run() {
					// Get all the recipes.
					List<Recipe> recipes = Ebean.find(Recipe.class).findList();
					// Randomly pick one of them up.
					System.out.println("Size of recipe: " + recipes.size());
					float nb = StdRandom.uniform(recipes.size());
					Logger.info("Hi, I'm a random event, giving you a random number: "
							+ nb);
					Recipe r = recipes.get(Math.round(nb));

					// If the recipe is null, do nothing but warn.
					if (r == null) {
						Logger.info("I've been willing to activate a random recipe but unfortunately there are no available one.");
						return;
					}
					// Activate it.
					System.out
							.println("launched recipe title: " + r.getTitle());
					SystemController.userGroupActorRouterMap.get(
							r.getUser().getUserGroup()).tell(
							RecipeAkka.recipesMap.get(r.getId())
									.getTriggerMessage(),
							RecipeAkka.recipesMap.get(r.getId())
									.getTriggerChannelActor());
					// Say hello to beloved logger.

				}
			};
			SystemController.scheduler
					.addRandomIssue(Duration.Zero(), randomPeriodFactory,
							StopCriteria.set(StopCriteria.OCCURENCE, 15),
							eventRunnable);

			/*
			 * So we are having two ways to activate a recipe. Let's cancel the
			 * never finishing first one:
			 */
			if (cancellableRef != null)
				cancellableRef.cancel();
		}

	}

	/**
	 * Used to display all the relations in a graph
	 */
	public static void export() {
		String filepath = "./export.txt";
		File file = new File(filepath);
		FileWriter fw;
		try {
			fw = new FileWriter(file, false);

			fw.write(Double.toString(StdRandom.random()));
			for (RecipeAkka r : RecipeAkka.recipesMap.values()) {
				System.out.println("Recipe: " + r);
				fw.write(/**/
				r.getTriggerChannelActor().path().name().toString()
						+ "\t"
						+ /**/
						r.getTriggerChannelActor().path()
								.toStringWithoutAddress()
						+ "\t"
						+ /**/
						r.getActionChannelActor().path().name().toString()
						+ "\t"
						+ /**/
						r.getActionChannelActor().path()
								.toStringWithoutAddress() + "\n");
			}
			fw.close();
			/*
			 * How to export to a SVG file. Better than a PNG because it can be
			 * zoomed :-)
			 */
			String command = "java -jar lib/visual.jar ";
			String input = filepath;
			String format = "svg";
			String output = "./public/images/graph.svg";
			Runtime.getRuntime().exec(command + "--input " + filepath + " --format " + format + " --output " + output);
		} catch (IOException e) {
		}

	}
}
