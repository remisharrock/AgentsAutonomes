import java.util.HashMap;

import main.DatabaseEngine;
import main.Script;
import models.Recipe;
import models.RecipeAkka;
import models.User;
import play.Application;
import play.GlobalSettings;
import play.Logger;

import com.avaje.ebean.Ebean;

import controllers.SystemController;

public class Global extends GlobalSettings {

	@Override
	public void onStart(Application app) {
		// this map will containt the mapper from normal recipe to RecipeAkka

		// if (Ebean.find(Recipe.class).findRowCount() == 0) {
		Logger.info("Deleting Database");
		/**
		 * DatabaseEngine.deleteDB(); used to delete all the data in the
		 * database
		 */
		DatabaseEngine.deleteDB();

		/**
		 * Instanciates the map that will contains the recipes and their
		 * corresponding RecipeAkka We can avoid using this hashmap, but to
		 * avoid querying the database and consuming some time, We cache all the
		 * recipes data in the map
		 */
		RecipeAkka.recipesMap = new HashMap<Long, RecipeAkka>();

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
		SystemController.getSystemControllerInstance().createActorRouterMap(User.getAllUserGroups());

		// CREATE AKKA RECIPES WITH ACTOR FOR ALL RECIPES
		/**
		 * For the recipes that already exist in the database We create the
		 * corresponding Recipe Akka
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

		Script.export("svg");

	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");

	}
}
