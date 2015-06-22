package main;
import java.util.ArrayList;
import java.util.List;

import models.Action;
import models.AdminLog;
import models.Channel;
import models.Field;
import models.Log;
import models.Recipe;
import models.RecipeAkka;
import models.Trigger;
import models.User;

import com.avaje.ebean.Ebean;


public class DatabaseEngine {
	
	/**
	 * This function permits to erase all the data in the database. It is mainly
	 * used for testing. To have all the data from scratch and test what exactly
	 * what we want.
	 * We have to follow a specific order when deleting because of some
	 * foreign keys constraints
	 */
	public static void deleteDB() {
		List<AdminLog> adminLogList = Ebean.find(AdminLog.class).findList();
		for (AdminLog al : adminLogList) {
			System.out.println(al);
			al.delete();
		}
		
		List<Log> logsList = Ebean.find(Log.class).findList();
		for (Log l : logsList) {
			System.out.println(l);
			l.delete();
		}
		
		List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
		for (Recipe r : recipesList) {
			System.out.println(r);
			r.delete();
		}

		List<Field> fieldsList = Ebean.find(Field.class).findList();
		// channelsList.removeAll(channelsList);
		for (Field f : fieldsList) {
			System.out.println("deleting field...: " + f);
			f.delete();
		}

		List<Trigger> triggersList = Ebean.find(Trigger.class).findList();
		// triggersList.removeAll(triggersList);
		for (Trigger t : triggersList) {
			System.out.println(t.getName());
			t.delete();
		}

		List<Action> actionsList = Ebean.find(Action.class).findList();
		// triggersList.removeAll(actionsList);
		for (Action a : actionsList) {
			System.out.println(a.getName());
			a.delete();
		}

		List<Channel> channelsList = Ebean.find(Channel.class).findList();
		// channelsList.removeAll(channelsList);
		for (Channel c : channelsList) {
			System.out.println(c);
			c.delete();
		}

		List<User> usersList = Ebean.find(User.class).findList();
		// channelsList.removeAll(channelsList);
		for (User u : usersList) {
			System.out.println(u);
			u.delete();
		}
	}
	
	/**
	 * This function permits to populate the database
	 * We begin first by creating the users
	 * then the channels with their triggers and actions and fiels that we can see
	 * then the recipes that will be by default in the database => also
	 * used for testing and for simulating
	 * All the created recipes will have a RecipeAkka created for each
	 * and will be put in a hashmap to have easy access
	 */
	public static void populateDB() {
		// Users
				User user1 = new User("1", "1", "user", "home1");
				user1.save();

				User user11 = new User("11", "11", "user", "home1");
				user11.save();

				User user111 = new User("11", "11", "user", "home1");
				user111.save();

				User user2 = new User("2", "2", "user", "home2");
				user2.save();

				User user22 = new User("22", "22", "user", "home2");
				user22.save();

				User user222 = new User("222", "222", "user", "home2");
				user222.save();

				User admin = new User("admin", "admin", "administrator", "admin1");
				admin.save();

				// HUMAN CHANNEL
				Channel human = new Channel("Human", "Can enter or exit room");
				human.setLogo("https://d3rnbxvnd0hlox.cloudfront.net/images/channels/1845421835/icons/regular.png");
				human.save();

				Action humanEnterRoomAction = new Action("Enter room", "Simulates a person entering a room");
				human.getActions().add(humanEnterRoomAction);
				humanEnterRoomAction.setChannel(human);
				humanEnterRoomAction.save();

				Action humanExitRoomAction = new Action("Exit room", "Simulates a person exiting a room");
				human.getActions().add(humanExitRoomAction);
				humanExitRoomAction.setChannel(human);
				humanExitRoomAction.save();

				human.save();

				
				// PRESENCE DETECTOR CHANNEL
				Channel detector = new Channel("Detector", "Detects humans");
				detector.setLogo("https://d3rnbxvnd0hlox.cloudfront.net/images/channels/85/icons/regular.png");
				detector.save();


				Trigger detectorTrigger1 = new Trigger("Detection On", "Detects a movement in the room");
				detectorTrigger1.setChannel(detector);
				detectorTrigger1.save();
				
				Trigger detectorTrigger2 = new Trigger("Detection Off", "No movement is detected in the room");
				detectorTrigger2.setChannel(detector);
				detectorTrigger2.save();




				detector.save();

				// LAMP CHANNEL
				Channel lamp = new Channel("Lamp", "Lamp");
				lamp.setLogo("https://d3rnbxvnd0hlox.cloudfront.net/images/channels/637201122/icons/regular.png");
				lamp.save();

				Action lampAction1 = new Action("Turn on lamp");
				lampAction1.setFieldName("Lamp Color");
				lamp.getActions().add(lampAction1);
				lampAction1.setChannel(lamp);
				lampAction1.save();

				Action lampAction2 = new Action("Turn off lamp");
				lamp.getActions().add(lampAction2);
				lampAction2.setChannel(lamp);
				lampAction2.save();

				lamp.save();
				
				
				
				
				// TEMPERATURE DETECTOR CHANNEL
				Channel temperatureDetector = new Channel("Temperature Detector", "Detects changes in the temperature");
				temperatureDetector.setLogo("https://d3rnbxvnd0hlox.cloudfront.net/images/channels/650643717/icons/regular.png");
				temperatureDetector.save();


				Trigger tempTrigger1 = new Trigger("Hot Temperature", "Detects when the room is hot");
				tempTrigger1.setChannel(temperatureDetector);
				tempTrigger1.save();
				
				Trigger tempTrigger2 = new Trigger("Cold Temperature", "Detects when the room is cold");
				tempTrigger2.setChannel(temperatureDetector);
				tempTrigger2.save();
				
				temperatureDetector.save();
				
				
				// AIR CONDITIONER CHANNEL
				Channel airConditioner = new Channel("Air Conditioner", "Air Conditioner");
				airConditioner.setLogo("https://d3rnbxvnd0hlox.cloudfront.net/images/channels/1482820867/icons/regular.png");
				airConditioner.save();

				Action turnOnHeater = new Action("Turn on heater");
				turnOnHeater.setFieldName("Required temperature");
				airConditioner.getActions().add(turnOnHeater);
				turnOnHeater.setChannel(airConditioner);
				turnOnHeater.save();

				Action turnOnCooler = new Action("Turn on cooler");
				airConditioner.getActions().add(turnOnCooler);
				turnOnCooler.setChannel(airConditioner);
				turnOnCooler.save();

				airConditioner.save();

				
				
				// Creating Recipes => the recipe akkas will be created
				Recipe rec = new Recipe();
				rec.save();
				rec.setTitle("Recipe1");
				rec.setUser(user1);
				rec.setTriggerChannel(detector);
				rec.setTrigger(detectorTrigger1);
				Field f1 = new Field("toto", "tata");
				f1.save();
				rec.setTriggerField(f1);

				rec.setActionChannel(lamp);
				rec.setAction(lampAction1);
				Field f2 = new Field("lamp color", "red");
				f2.save();
				rec.setActionField(f2);
				rec.setActive(true);
				rec.setLog(new ArrayList<Log>());
				rec.save();
				
				
				RecipeAkka.recipesMap.put(rec.getId(), rec.getRecipeAkka());
				
				
				
				Recipe rec2 = new Recipe();
				rec2.save();
				rec2.setTitle("Recipe2");
				rec2.setUser(user1);
				rec2.setTriggerChannel(temperatureDetector);
				rec2.setTrigger(tempTrigger1);
				Field f21 = new Field("totasdo", "tatqwea");
				f21.save();
				rec2.setTriggerField(f21);

				rec2.setActionChannel(airConditioner);
				rec2.setAction(turnOnCooler);
				Field f22 = new Field("temp", "16 degrees");
				f22.save();
				rec2.setActionField(f22);
				rec2.setActive(true);
				rec2.setLog(new ArrayList<Log>());
				rec2.save();
				
				RecipeAkka.recipesMap.put(rec2.getId(), rec2.getRecipeAkka());
				
				
				Recipe rec3 = new Recipe();
				rec3.save();
				rec3.setTitle("Recipe3");
				rec3.setUser(user1);
				rec3.setTriggerChannel(detector);
				rec3.setTrigger(detectorTrigger1);
				Field f31 = new Field("totasdo", "tatqwea");
				f31.save();
				rec3.setTriggerField(f31);

				rec3.setActionChannel(human);
				rec3.setAction(humanExitRoomAction);
				Field f32 = new Field("speed", "fast");
				f32.save();
				rec3.setActionField(f32);
				rec3.setActive(true);
				rec3.setLog(new ArrayList<Log>());
				rec3.save();
				
				RecipeAkka.recipesMap.put(rec3.getId(), rec3.getRecipeAkka());
				
				
				Recipe rec4 = new Recipe();
				rec4.save();
				rec4.setTitle("Recipe4");
				rec4.setUser(user2);
				rec4.setTriggerChannel(temperatureDetector);
				rec4.setTrigger(tempTrigger1);
				Field f41 = new Field("totasdo", "tatqwea");
				f41.save();
				rec4.setTriggerField(f41);

				rec4.setActionChannel(airConditioner);
				rec4.setAction(turnOnCooler);
				Field f42 = new Field("temp", "5 degrees");
				f42.save();
				rec4.setActionField(f42);
				rec4.setActive(true);
				rec4.setLog(new ArrayList<Log>());
				rec4.save();
				
				RecipeAkka.recipesMap.put(rec4.getId(), rec4.getRecipeAkka());
				
				
				
				Recipe rec5 = new Recipe();
				rec5.save();
				rec5.setTitle("Recipe5");
				rec5.setUser(user2);
				rec5.setTriggerChannel(temperatureDetector);
				rec5.setTrigger(tempTrigger1);
				Field f51 = new Field("totasdo", "tatqwea");
				f51.save();
				rec5.setTriggerField(f51);

				rec5.setActionChannel(airConditioner);
				rec5.setAction(turnOnHeater);
				Field f52 = new Field("temp", "35 degrees");
				f52.save();
				rec5.setActionField(f52);
				rec5.setActive(true);
				rec5.setLog(new ArrayList<Log>());
				rec5.save();
				
				RecipeAkka.recipesMap.put(rec5.getId(), rec5.getRecipeAkka());
				
				
				
				Recipe rec6 = new Recipe();
				rec6.save();
				rec6.setTitle("Recipe6");
				rec6.setUser(user1);
				rec6.setTriggerChannel(detector);
				rec6.setTrigger(detectorTrigger1);
				Field f61 = new Field("toto", "tata");
				f61.save();
				rec6.setTriggerField(f61);

				rec6.setActionChannel(lamp);
				rec6.setAction(lampAction1);
				Field f62 = new Field("lamp color", "yellow");
				f62.save();
				rec6.setActionField(f62);
				rec6.setActive(true);
				rec6.setLog(new ArrayList<Log>());
				rec6.save();
				
				RecipeAkka.recipesMap.put(rec6.getId(), rec6.getRecipeAkka());
				
				
				
				Recipe rec7 = new Recipe();
				rec7.save();
				rec7.setTitle("Recipe5");
				rec7.setUser(user2);
				rec7.setTriggerChannel(temperatureDetector);
				rec7.setTrigger(tempTrigger2);
				Field f71 = new Field("totasdo", "tatqwea");
				f71.save();
				rec7.setTriggerField(f71);

				rec7.setActionChannel(airConditioner);
				rec7.setAction(turnOnCooler);
				Field f72 = new Field("temp", "10 degrees");
				f72.save();
				rec7.setActionField(f72);
				rec7.setActive(true);
				rec7.setLog(new ArrayList<Log>());
				rec7.save();
				
				RecipeAkka.recipesMap.put(rec7.getId(), rec7.getRecipeAkka());
				
				
	}
}
