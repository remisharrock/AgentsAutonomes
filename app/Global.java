import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.DoubleBinaryOperator;
import java.util.function.Function;
import java.util.function.IntBinaryOperator;
import java.util.function.IntUnaryOperator;

import messages.AllMessages;
import models.Action;
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
import actors.StdRandom;

import com.avaje.ebean.Ebean;

import controllers.routes.javascript;

public class Global extends GlobalSettings {

	public void onStart(Application app) {
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
		Channel human = new Channel("Human", "Can enter or exit room", AllActors.human);
		human.save();

		Action humanEnterRoomAction = new Action("Enter room");
		human.getActions().add(humanEnterRoomAction);
		humanEnterRoomAction.setChannel(human);
		humanEnterRoomAction.save();

		Action humanExitRoomAction = new Action("Exit room");
		human.getActions().add(humanExitRoomAction);
		humanExitRoomAction.setChannel(human);
		humanExitRoomAction.save();

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

		/*
		 * Example how to schedule a random action to be performed. Here we
		 * randomly send two actions to the lamp : it will result in a somewhat
		 * erratic behaviour.
		 */
		AllActors.random.scheduleActionMessage(Duration.Zero(), AllActors.lamp, new AllMessages.TurnOnLamp(true),
				Void -> 3 * StdRandom.gaussian(5, 2));
		AllActors.random.scheduleActionMessage(Duration.Zero(), AllActors.lamp, new AllMessages.TurnOffLamp(true),
				Void -> 3 * StdRandom.gaussian(5, 2));
		/*
		 * The example above is poor. It's much nicer to use a function to
		 * define on-the-fly which message will be sent. Then, we cancel all
		 * we've done and we start again in a more proper way.
		 */
		AllActors.random.cancelAll(); // forget all we've done.
		AllActors.random.scheduleActionMessage(
		/* The initialisation delay */
		Duration.Zero(),
		/* The actor which will receive messages */
		AllActors.lamp,
		/* This function which will be called to define each message on the fly. */
		Void -> (AllActors.Lamp.state == "OFF") ? new AllMessages.TurnOffLamp(true) : new AllMessages.TurnOnLamp(true),
		/* As this function takes no argument, we show it with Void. */
		Void -> 3 * StdRandom.gaussian(5, 2));

		/*
		 * To make it clear about functions defined on the fly, this is such a
		 * function that can multiply an integer by two:
		 */
		Function<Integer, Integer> multiplyByTwo0 = n -> n * 2;
		/*
		 * It's the same but the semantic is more precise to change for an unary
		 * operator:
		 */
		IntUnaryOperator multiplyByTwo1 = n -> n * 2;
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");

	}
}