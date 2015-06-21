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
		DatabaseEngine.deleteDB();
		RecipeAkka.recipesMap = new HashMap<Long, RecipeAkka>();

//		if (Ebean.find(Recipe.class).findRowCount() == 0) {

		DatabaseEngine.populateDB();

		Logger.info("Init Data");

		/**
		 * In this case we already have recipes on our database But those
		 * recipes won't have their equivalent in akka So we should iterate on
		 * all the recipes that we have and create the equivalent recipeAkka for
		 * each
		 */

		// Create actor router for all the user groups that we have
		SystemController.getSystemControllerInstance().createActorRouterMap(
				User.getAllUserGroups());
		System.out.println("UserGroup - Router Map: "
				+ SystemController.getSystemControllerInstance()
						.getUserGroupActorRouterMap());


		// CREATE AKKA RECIPES WITH ACTOR FOR ALL RECIPES
		for (Recipe r : Ebean.find(Recipe.class).findList()) {
			System.out.println("Creating akka recipe from recipe...");
			RecipeAkka.recipesMap
					.put(r.getId(), r.createRecipeAkkaFromRecipe());
		}


		Script.random();

		
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");

	}
}
