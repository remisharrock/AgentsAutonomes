package main;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import models.Action;
import models.AdminLog;
import models.Channel;
import models.Field;
import models.Log;
import models.Recipe;
import models.RecipeAkka;
import models.Trigger;
import models.User;
import play.Application;
import play.GlobalSettings;
import play.Logger;
import scala.concurrent.duration.Duration;

import com.avaje.ebean.Ebean;

import controllers.Scheduler;
import controllers.Scheduler.CancellableRef;
import controllers.StdRandom;
import controllers.SystemController;
import controllers.Scheduler.RandomPeriodFactory;
import controllers.Scheduler.StopCriteria;

public class Global extends GlobalSettings {

	@SuppressWarnings("deprecation")
	public void onStart(Application app) {
		// this map will containt the mapper from normal recipe to RecipeAkka
		Logger.info("Deleting Database");
		/**
		 * DatabaseEngine.deleteDB(); used to delete all the data in the database
		 */
		DatabaseEngine.deleteDB();
		
		/**
		 * Instanciates the map that will contains the recipes and their corresponding RecipeAkka
		 */
		RecipeAkka.recipesMap = new HashMap<Long, RecipeAkka>();

//		if (Ebean.find(Recipe.class).findRowCount() == 0) {

		Logger.info("Populating database");
		DatabaseEngine.populateDB();


		/**
		 * In this case we already have recipes on our database But those
		 * recipes won't have their equivalent in akka So we should iterate on
		 * all the recipes that we have and create the equivalent recipeAkka for
		 * each
		 */
		
		Logger.info("creating maps");

		// Create actor router for all the user groups that we have
		/**
		 * Creating the Actor router for each UserGroup
		 */
		SystemController.getSystemControllerInstance().createActorRouterMap(
				User.getAllUserGroups());
		System.out.println("UserGroup - Router Map: "
				+ SystemController.getSystemControllerInstance()
						.getUserGroupActorRouterMap());


		// CREATE AKKA RECIPES WITH ACTOR FOR ALL RECIPES
		/**
		 * For the recipes that already exist in the database
		 * We create the corresponding Recipe Akka
		 */
		for (Recipe r : Ebean.find(Recipe.class).findList()) {
			if (!RecipeAkka.recipesMap.containsKey(r.getId())) {
				System.out.println("Creating akka recipe from recipe...");
				RecipeAkka ra = r.createRecipeAkkaFromRecipe();
				r.setRecipeAkka(ra);
				RecipeAkka.recipesMap.put(r.getId(), ra);
			} else {
				System.out.println("Recipe already exists in Map...");
			}
		}


		/**
		 * Launching the recipes' triggers randomly for a certain amount of time
		 */
		Script.random();

		
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");

	}
}
