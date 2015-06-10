import java.util.ArrayList;
import java.util.List;

import models.Action;
import models.Actor;
import models.Channel;
import models.Field;
import models.Recipe;
import models.Trigger;
import models.User;
import play.Application;
import play.GlobalSettings;
import play.Logger;
import scala.concurrent.duration.Duration;
import actors.AllActors;
import actors.AllActors.Detector;
import actors.AllActors.Garage;
import actors.AllActors.Human;
import actors.AllActors.Lamp;
import actors.AllActors.LuminosityDetector;
import actors.AllActors.Manythings;
import actors.AllMessages;
import actors.AllMessages.Lamp.TurnOn;
import actors.StdRandom;
import akka.actor.Props;

import com.avaje.ebean.Ebean;

import controllers.Controller;

public class Global extends GlobalSettings {

	private void generateActorsFromDB() {
		Ebean.find(Actor.class).findList().parallelStream()
		/* We create an actor for each actor in the DB */
		.forEach(actor -> {
			try {
				Controller.get().system().actorOf(Props.create(Class.forName(actor.getClazz()), actor.getName()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		});

	}

	public void onStart(Application app) {

		generateActorsFromDB();

		Controller.get().system().actorOf(Props.create(Human.class), "human");
		Controller.get().system().actorOf(Props.create(Detector.class), "detector");
		Controller.get().system().actorOf(Props.create(Lamp.class), "lamp");
		Controller.get().system().actorOf(Props.create(LuminosityDetector.class), "luminosityDetector");
		Controller.get().system().actorOf(Props.create(Manythings.class), "manythings");
		Controller.get().system().actorOf(Props.create(Garage.class), "garage");

		/**
		 * TODO Example of how to add a new recipe in the back-end side. Maybe
		 * it should be elsewhere, I don't know. Please put it at the correct
		 * place and remove this comment
		 */
		Controller.get().registerRecipe(AllActors.detector, AllMessages.DetectionOn.class,
				"TurnOnLampWhenDetectorRecipe",
				"This description should be easy to read. Not sure whether it'd avec be useful anyway ~",
				AllActors.lamp, triggerMessage -> new AllMessages.TurnOnLamp(true));

		/**
		 * More powerful example.
		 */
		Controller
				.get()
				.registerRecipe(AllActors.manythings,
						AllMessages.Manythings.MotionDetected.class,
						"TurnOnLampWhenMovementRecipe",
						"This description should be easy to read. Not sure whether it'd avec be useful anyway ~",
						AllActors.lamp,
						triggerMessage -> {

							String colour = null;
							Integer intensity = null;
							Boolean lowConsumptionMode = null;

							// Don't forget to check for nullity.
						if (triggerMessage != null && triggerMessage instanceof AllMessages.Manythings.MotionDetected) {
							AllMessages.Manythings.MotionDetected trigger = (AllMessages.Manythings.MotionDetected) triggerMessage;
							colour = null;
							switch (trigger.getDeviceId()) {
							case 1:
								colour = "Orange";
								break;
							default:
								colour = "Green";
								break;
							}
							intensity = (trigger.getQuantitéDeMouvement() > 0.6) ? 10 : 4;
							lowConsumptionMode = true;
						}
						AllMessages.Lamp.TurnOn message = new TurnOn(colour, intensity, lowConsumptionMode);
						return message;
					});

		/**
		 * Example how to schedule a random action to be performed.
		 */
		Controller
				.get()
				.getScheduler()
				.scheduleActionMessage(Duration.Zero(), AllActors.garage, Void -> new AllMessages.Garage.Close(1),
						Void -> 3 * StdRandom.gaussian(5, 2));

		System.out.println(Ebean.find(Channel.class).findRowCount());
		// if (Ebean.find(Channel.class).findRowCount() != 0) {

		List<Field> fieldsList = Ebean.find(Field.class).findList();
		// channelsList.removeAll(channelsList);
		for (Field f : fieldsList) {

			System.out.println("EWWWWWWWWWWW" + f);
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

		List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
		// channelsList.removeAll(channelsList);
		for (Recipe r : recipesList) {
			System.out.println(r);
			r.delete();
		}

		List<User> usersList = Ebean.find(User.class).findList();
		// channelsList.removeAll(channelsList);
		for (User u : usersList) {
			System.out.println(u);
			u.delete();
		}

		Logger.info("Init Data");

		// Users
		User user1 = new User("1", "1", "user", "home1");
		user1.save();

		User user2 = new User("2", "2", "administrator", "home1");
		user2.save();

		// HUMAN CHANNEL
		Channel human;
		ArrayList<Action> actions = new ArrayList<>();
		ArrayList<Action> actions = new ArrayList<>();
		actions.add(new Action(null, human, "", ""));

		human = new Channel(null, actions, "Human", "Can enter or exit room");

		human.save();

		// PRESENCE DETECTOR CHANNEL
		Channel detector = new Channel("Detector", "Detects humans", AllActors.detector);
		detector.save();

		// Trigger detectorTrigger1 = new Trigger("Presence Trigger",
		// "Trigger description", AllMessages.DetectionOn.class);
		Trigger detectorTrigger1 = new Trigger("Presence Trigger", "Trigger description");
		detector.getTriggers().add(detectorTrigger1);
		detectorTrigger1.setChannel(detector);
		detectorTrigger1.save();

		// Trigger detectorTrigger2 = new Trigger("Non presence Trigger",
		// AllMessages.DetectionOff.class);
		Trigger detectorTrigger2 = new Trigger("Non presence Trigger");
		detector.getTriggers().add(detectorTrigger2);
		detectorTrigger2.setChannel(detector);
		detectorTrigger2.save();

		detector.save();

		// LUMINOSITY DETECTOR CHANNEL
		Channel luminosityDetector = new Channel("Luminosity detector", "Detects luminosity",
				AllActors.luminosityDetector);
		luminosityDetector.save();

		// Keep in mind to change null pointer for messages
		// Trigger detectorTrigger12 = new Trigger("Light Trigger",
		// "Trigger description 00000", null);
		Trigger detectorTrigger12 = new Trigger("Light Trigger", "Trigger description 00000");
		luminosityDetector.getTriggers().add(detectorTrigger12);

		detectorTrigger12.save();

		List<Field> fields = new ArrayList<Field>();
		for (int i = 0; i < 2; i++) {
			Field field = new Field((new String("Field name " + i)), new String("Field description " + i));
			field.setTrigger(detectorTrigger12);
			field.save();
			fields.add(field);

		}

		detectorTrigger12.setChannel(detector);
		detectorTrigger12.save();

		Trigger detectorTrigger13 = new Trigger("Non light Trigger", null);
		luminosityDetector.getTriggers().add(detectorTrigger13);
		detectorTrigger13.setChannel(luminosityDetector);
		detectorTrigger13.save();

		// Trigger detectorTrigger14 = new Trigger("Light Trigger1",
		// "Trigger description", null);
		Trigger detectorTrigger14 = new Trigger("Light Trigger1", "Trigger description");
		luminosityDetector.getTriggers().add(detectorTrigger14);
		detectorTrigger14.save();
		detectorTrigger14.setChannel(detector);

		// Trigger detectorTrigger15 = new Trigger("Light Trigger2",
		// "Trigger description", null);
		Trigger detectorTrigger15 = new Trigger("Light Trigger2", "Trigger description");
		luminosityDetector.getTriggers().add(detectorTrigger15);
		detectorTrigger15.save();
		detectorTrigger15.setChannel(detector);

		// Trigger detectorTrigger16 = new Trigger("Light Trigger3",
		// "Trigger description", null);
		Trigger detectorTrigger16 = new Trigger("Light Trigger3", "Trigger description");
		luminosityDetector.getTriggers().add(detectorTrigger16);
		detectorTrigger16.save();
		detectorTrigger16.setChannel(detector);

		// Trigger detectorTrigger17 = new Trigger("Light Trigger",
		// "Trigger description", null);
		Trigger detectorTrigger17 = new Trigger("Light Trigger", "Trigger description");
		luminosityDetector.getTriggers().add(detectorTrigger17);
		detectorTrigger17.save();
		detectorTrigger17.setChannel(detector);

		// Trigger detectorTrigger18 = new Trigger("Light Trigger",
		// "Trigger description", null);
		Trigger detectorTrigger18 = new Trigger("Light Trigger", "Trigger description");
		luminosityDetector.getTriggers().add(detectorTrigger18);
		detectorTrigger18.save();
		detectorTrigger18.setChannel(detector);

		luminosityDetector.save();

		// LAMP CHANNEL
		Channel lamp = new Channel("Lamp", "I am a Lamp", AllActors.lamp);
		lamp.save();

		Action lampAction1 = new Action("Turn on lamp");
		lamp.getActions().add(lampAction1);
		lampAction1.setChannel(lamp);
		lampAction1.save();

		Action lampAction2 = new Action("Turn off lamp");
		lamp.getActions().add(lampAction2);
		lampAction2.setChannel(lamp);
		lampAction2.save();

		lamp.save();

		// } else {
		// List<Channel> channelsList = Ebean.find(Channel.class).findList();
		// for (Channel c : channelsList) {
		// System.out.println(c);
		// }
		// }
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");
	}
}