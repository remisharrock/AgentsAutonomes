import java.util.Arrays;
import java.util.List;

import models.Action;
import models.Modality;
import models.Trigger;
import play.GlobalSettings;
import play.Logger;
import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

import controllers.Application;

/**
 * To understand how an instance of this class works, better to first give a
 * look to onStart().
 */
public class Global extends GlobalSettings {

	{
		Logger.info("\n\n\nHear me from static Global");
	}

	/*
	 * TODO First a script must populate the database. We faint it here
	 * programmatically but it should be performed directly on the DB.
	 */
	public void beforeStart(Application app) {
		/*
		 * La flemme. TODO pour toi lectrice ou lecteur ! Prend ta liberté en
		 * main et définit selon ton gré les channels qui colleront le mieux aux
		 * acteurs définis dans AllActors :) !
		 */

		Logger.info("\n\n\nHear me from Global");
		DBerase();
		DBpopulate();

	}

	private void generateStaticCausalityFromRecipes() {
		// Ebean.find(Recipe.class)
		// .findList()
		// .forEach(
		// recipe -> LogicController.getCommutator().addCausalRelation(
		// LogicController.getSystemProxy().getOrCreateStaticActorFor(recipe.getTriggerChannel()),
		// recipe.getTrigger().getClazz(),
		// recipe.getDescription(),
		// LogicController.getSystemProxy().getOrCreateStaticActorFor(recipe.getActionChannel()),
		// LogicController.getMessageMap().getMapper(recipe.getTrigger().getClazz(),
		// recipe.getAction().getClazz())));
	}

	private void generateCausalityFromRecipes() {
	}

	public void onStart(Application app) {

		generateStaticCausalityFromRecipes();
		generateCausalityFromRecipes();
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");
	}

	/**
	 * Shouldn't it be avoid?
	 */
	@Deprecated
	private void DBerase() {
		List<Class> classes = Arrays.asList(Modality.class, Trigger.class, Action.class);
		classes.forEach(y -> Ebean.find(y).findList().forEach(x -> ((Model) x).delete()));
	}

	/**
	 * Shouldn't it be performed by a script once for all?
	 */
	@Deprecated
	private void DBpopulate() {

		// // this map will containt the mapper from normal recipe to RecipeAkka
		// RecipeAkka.recipesMap = new HashMap<Long, RecipeAkka>();
		//
		// System.out.println("test");
		// System.out.println("TESTING THE DATABASE LOAD");
		//
		// // if (Ebean.find(Recipe.class).findRowCount() == 0) {
		//
		// List<Field> fieldsList = Ebean.find(Field.class).findList();
		// // channelsList.removeAll(channelsList);
		// for (Field f : fieldsList) {
		// System.out.println("deleting field...: " + f);
		// f.delete();
		// }
		//
		// List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
		// // channelsList.removeAll(channelsList);
		// for (Recipe r : recipesList) {
		// System.out.println(r);
		// r.delete();
		// }
		//
		// List<Trigger> triggersList = Ebean.find(Trigger.class).findList();
		// // triggersList.removeAll(triggersList);
		// for (Trigger t : triggersList) {
		// System.out.println(t.getName());
		// t.delete();
		// }
		//
		// List<Action> actionsList = Ebean.find(Action.class).findList();
		// // triggersList.removeAll(actionsList);
		// for (Action a : actionsList) {
		// System.out.println(a.getName());
		// a.delete();
		// }
		//
		// List<Channel> channelsList = Ebean.find(Channel.class).findList();
		// // channelsList.removeAll(channelsList);
		// for (Channel c : channelsList) {
		// System.out.println(c);
		// c.delete();
		// }
		//
		// List<User> usersList = Ebean.find(User.class).findList();
		// // channelsList.removeAll(channelsList);
		// for (User u : usersList) {
		// System.out.println(u);
		// u.delete();
		// }
		//
		// Logger.info("Init Data");
		//
		// // Users
		// User user1 = new User("1", "1", "user", "home1");
		// user1.save();
		//
		// User user2 = new User("2", "2", "administrator", "home1");
		// user2.save();
		//
		// // HUMAN CHANNEL
		// Channel human = new Channel("Human", "Can enter or exit room");
		// human.save();
		//
		// Action humanEnterRoomAction = new Action("Enter room");
		// human.getActions().add(humanEnterRoomAction);
		// humanEnterRoomAction.setChannel(human);
		// humanEnterRoomAction.save();
		//
		// Action humanExitRoomAction = new Action("Exit room");
		// human.getActions().add(humanExitRoomAction);
		// humanExitRoomAction.setChannel(human);
		// humanExitRoomAction.save();
		//
		// human.save();
		//
		// // PRESENCE DETECTOR CHANNEL
		// Channel detector = new Channel("Detector", "Detects humans");
		// detector.save();
		//
		// // Trigger detectorTrigger1 = new Trigger("Presence Trigger",
		// // "Trigger description", AllMessages.DetectionOn.class);
		// Trigger detectorTrigger1 = new Trigger("Detection On",
		// "Trigger description");
		// // detector.getTriggers().add(detectorTrigger1);
		// detectorTrigger1.setChannel(detector);
		// detectorTrigger1.save();
		// // Field f = new Field("My Field", "My description");
		// // f.setTrigger(detectorTrigger1);
		// // f.save();
		// // detectorTrigger1.setField(f);
		// detectorTrigger1.save();
		//
		// // // Trigger detectorTrigger2 = new Trigger("Non presence Trigger",
		// // AllMessages.DetectionOff.class);
		// // Trigger detectorTrigger2 = new Trigger("Non presence Trigger");
		// // // detector.getTriggers().add(detectorTrigger2);
		// // detectorTrigger2.setChannel(detector);
		// // detectorTrigger2.save();
		// //
		// // detector.save();
		//
		// // LUMINOSITY DETECTOR CHANNEL
		// Channel luminosityDetector = new Channel("Luminosity detector",
		// "Detects luminosity");
		// luminosityDetector.save();
		//
		// // Keep in mind to change null pointer for messages
		// // Trigger detectorTrigger12 = new Trigger("Light Trigger",
		// // "Trigger description 00000", null);
		// Trigger detectorTrigger12 = new Trigger("Light Trigger",
		// "Trigger description 00000");
		// detectorTrigger12.setChannel(luminosityDetector);
		// detectorTrigger12.save();
		//
		// detectorTrigger12.save();
		//
		// Trigger detectorTrigger13 = new Trigger("Non light Trigger", null);
		// // luminosityDetector.getTriggers().add(detectorTrigger13);
		// detectorTrigger13.setChannel(luminosityDetector);
		// detectorTrigger13.save();
		//
		// // Trigger detectorTrigger14 = new Trigger("Light Trigger1",
		// // "Trigger description", null);
		// Trigger detectorTrigger14 = new Trigger("Light Trigger1",
		// "Trigger description");
		// // luminosityDetector.getTriggers().add(detectorTrigger14);
		// detectorTrigger14.setChannel(detector);
		// detectorTrigger14.save();
		//
		// // Trigger detectorTrigger15 = new Trigger("Light Trigger2",
		// // "Trigger description", null);
		// Trigger detectorTrigger15 = new Trigger("Light Trigger2",
		// "Trigger description");
		// // luminosityDetector.getTriggers().add(detectorTrigger15);
		// detectorTrigger15.setChannel(detector);
		// detectorTrigger15.save();
		//
		// // Trigger detectorTrigger16 = new Trigger("Light Trigger3",
		// // "Trigger description", null);
		// Trigger detectorTrigger16 = new Trigger("Light Trigger3",
		// "Trigger description");
		// // luminosityDetector.getTriggers().add(detectorTrigger16);
		// detectorTrigger16.setChannel(detector);
		// detectorTrigger16.save();
		//
		// // Trigger detectorTrigger17 = new Trigger("Light Trigger",
		// // "Trigger description", null);
		// Trigger detectorTrigger17 = new Trigger("Light Trigger4",
		// "Trigger description");
		// // luminosityDetector.getTriggers().add(detectorTrigger17);
		// detectorTrigger17.setChannel(detector);
		// detectorTrigger17.save();
		//
		// //
		// Trigger detectorTrigger18 = new Trigger("Light Trigger5",
		// "Trigger description");
		// // luminosityDetector.getTriggers().add(detectorTrigger18);
		// detectorTrigger18.setChannel(detector);
		// detectorTrigger18.save();
		//
		// detector.save();
		// luminosityDetector.save();
		//
		// detector.save();
		//
		// // LAMP CHANNEL
		// Channel lamp = new Channel("Lamp", "I am a Lamp");
		// lamp.save();
		//
		// Action lampAction1 = new Action("Turn on lamp");
		// lampAction1.setFieldName("Lamp Color");
		// lamp.getActions().add(lampAction1);
		// lampAction1.setChannel(lamp);
		// lampAction1.save();
		//
		// Action lampAction2 = new Action("Turn off lamp");
		// lamp.getActions().add(lampAction2);
		// lampAction2.setChannel(lamp);
		// lampAction2.save();
		//
		// lamp.save();
		//
		// // Creating Recipes => the recipe akkas will be created
		// Recipe rec = new Recipe();
		// rec.setTitle("Recipe1");
		// rec.setUser(user1);
		// rec.setTriggerChannel(detector);
		// rec.setTrigger(detectorTrigger1);
		// Field f1 = new Field("toto", "tata");
		// f1.save();
		// rec.setTriggerField(f1);
		//
		// rec.setActionChannel(lamp);
		// rec.setAction(lampAction2);
		// Field f2 = new Field("lamp color", "red");
		// f2.save();
		// rec.setActionField(f2);
		// rec.setActive(true);
		// rec.setLog(new ArrayList<Log>());
		// rec.save();
		//
		// for (Channel c : Ebean.find(Channel.class).findList()) {
		// System.out.println(c);
		// }
		// // } else {
		// /**
		// * In this case we already have recipes on our database But those
		// * recipes won't have their equivalent in akka So we should iterate on
		// * all the recipes that we have and create the equivalent recipeAkka
		// for
		// * each
		// */
		//
		// // Create actor router for all the user groups that we have
		// SystemController.getSystemControllerInstance().createActorRouterMap(User.getAllUserGroups());
		// System.out.println("UserGroup - Router Map: "
		// +
		// SystemController.getSystemControllerInstance().getUserGroupActorRouterMap());
		//
		// // CREATE AKKA RECIPES WITH ACTOR FOR ALL RECIPES
		// for (Recipe r : Ebean.find(Recipe.class).findList()) {
		// System.out.println("Creating akka recipe from recipe...");
		// RecipeAkka.recipesMap.put(r.getId(), r.createRecipeAkkaFromRecipe());
		// }
		//
		// Recipe r = Ebean.find(Recipe.class).findList().get(0);
		// SystemController.userGroupActorRouterMap.get(r.getUser().getUserGroup()).tell(
		// RecipeAkka.recipesMap.get(r.getId()).getTriggerMessage(),
		// RecipeAkka.recipesMap.get(r.getId()).getTriggerChannelActor());
		// // List<User> allUsersFromSameGroup = User
		// // .getAllUsersFromSameGroup(controllers.Application
		// // .getUserLoggedIn().getUserGroup());
		// //
		// // for (User u : allUsersFromSameGroup) {
		//
		// // courses.find.where().eq("student_id", student_id).findList();

	}
}