import java.util.List;
import java.util.function.Function;
import java.util.function.IntUnaryOperator;

import models.Action;
import models.Channel;
import models.Modality;
import models.Recipe;
import models.Trigger;
import models.User;
import play.GlobalSettings;
import play.Logger;
import scala.concurrent.duration.Duration;
import actors.AllActors;
import actors.AllMessages;
import actors.AllMessages.Lamp;
import actors.StdRandom;

import com.avaje.ebean.Ebean;

import controllers.Application;

public class Global extends GlobalSettings {

	/*
	 * TODO First a script must populate the database. We faint it here
	 * programmatically.
	 */
	public void beforeStart(Application app) {
		/*
		 * La flemme. TODO pour toi lectrice ou lecteur ! Prend ta liberté en
		 * main et définit selon ton gré les channels qui colleront le mieux aux
		 * acteurs définis dans AllActors :) !
		 */

		// Useful sketch from a previous state.
		// // HUMAN CHANNEL
		// Channel human = new Channel("Human", "Can enter or exit room",
		// AllActors.human);
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
		// Channel detector = new Channel("Detector", "Detects humans",
		// AllActors.detector);
		// detector.save();
		//
		// // Trigger detectorTrigger1 = new Trigger("Presence Trigger",
		// // "Trigger description", AllMessages.DetectionOn.class);
		// Trigger detectorTrigger1 = new Trigger("Presence Trigger",
		// "Trigger description");
		// detector.getTriggers().add(detectorTrigger1);
		// detectorTrigger1.setChannel(detector);
		// detectorTrigger1.save();
		//
		// // Trigger detectorTrigger2 = new Trigger("Non presence Trigger",
		// // AllMessages.DetectionOff.class);
		// Trigger detectorTrigger2 = new Trigger("Non presence Trigger");
		// detector.getTriggers().add(detectorTrigger2);
		// detectorTrigger2.setChannel(detector);
		// detectorTrigger2.save();
		//
		// detector.save();
		//
		// // LUMINOSITY DETECTOR CHANNEL
		// Channel luminosityDetector = new Channel("Luminosity detector",
		// "Detects luminosity",
		// AllActors.luminosityDetector);
		// luminosityDetector.save();
		//
		// // Keep in mind to change null pointer for messages
		// // Trigger detectorTrigger12 = new Trigger("Light Trigger",
		// // "Trigger description 00000", null);
		// Trigger detectorTrigger12 = new Trigger("Light Trigger",
		// "Trigger description 00000");
		// luminosityDetector.getTriggers().add(detectorTrigger12);
		//
		// detectorTrigger12.save();
		//
		// List<Field> fields = new ArrayList<Field>();
		// for (int i = 0; i < 2; i++) {
		// Field field = new Field((new String("Field name " + i)), new
		// String("Field description " + i));
		// field.setTrigger(detectorTrigger12);
		// field.save();
		// fields.add(field);
		//
		// }
		//
		// detectorTrigger12.setChannel(detector);
		// detectorTrigger12.save();
		//
		// Trigger detectorTrigger13 = new Trigger("Non light Trigger", null);
		// luminosityDetector.getTriggers().add(detectorTrigger13);
		// detectorTrigger13.setChannel(luminosityDetector);
		// detectorTrigger13.save();
		//
		// // Trigger detectorTrigger14 = new Trigger("Light Trigger1",
		// // "Trigger description", null);
		// Trigger detectorTrigger14 = new Trigger("Light Trigger1",
		// "Trigger description");
		// luminosityDetector.getTriggers().add(detectorTrigger14);
		// detectorTrigger14.save();
		// detectorTrigger14.setChannel(detector);
		//
		// // Trigger detectorTrigger15 = new Trigger("Light Trigger2",
		// // "Trigger description", null);
		// Trigger detectorTrigger15 = new Trigger("Light Trigger2",
		// "Trigger description");
		// luminosityDetector.getTriggers().add(detectorTrigger15);
		// detectorTrigger15.save();
		// detectorTrigger15.setChannel(detector);
		//
		// // Trigger detectorTrigger16 = new Trigger("Light Trigger3",
		// // "Trigger description", null);
		// Trigger detectorTrigger16 = new Trigger("Light Trigger3",
		// "Trigger description");
		// luminosityDetector.getTriggers().add(detectorTrigger16);
		// detectorTrigger16.save();
		// detectorTrigger16.setChannel(detector);
		//
		// // Trigger detectorTrigger17 = new Trigger("Light Trigger",
		// // "Trigger description", null);
		// Trigger detectorTrigger17 = new Trigger("Light Trigger",
		// "Trigger description");
		// luminosityDetector.getTriggers().add(detectorTrigger17);
		// detectorTrigger17.save();
		// detectorTrigger17.setChannel(detector);
		//
		// // Trigger detectorTrigger18 = new Trigger("Light Trigger",
		// // "Trigger description", null);
		// Trigger detectorTrigger18 = new Trigger("Light Trigger",
		// "Trigger description");
		// luminosityDetector.getTriggers().add(detectorTrigger18);
		// detectorTrigger18.save();
		// detectorTrigger18.setChannel(detector);
		//
		// luminosityDetector.save();
		//
		// // LAMP CHANNEL
		// Channel lamp = new Channel("Lamp", "I am a Lamp", AllActors.lamp);
		// lamp.save();
		//
		// Action lampAction1 = new Action("Turn on lamp");
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
	}

	private void generateStaticCausalityFromRecipes() {
		Ebean.find(Recipe.class)
				.findList()
				.forEach(
						recipe -> Application.getCommutator().addCausality(
								Application.getSystemProxy().getStaticActorFor(recipe.getTriggerChannel()),
								recipe.getTrigger().getClazz(),
								recipe.getName(),
								recipe.getDescription(),
								Application.getSystemProxy().getStaticActorFor(recipe.getActionChannel()),
								Application.getMessageMap().getMapper(recipe.getTrigger().getClazz(),
										recipe.getAction().getClazz())));
	}

	private void generateCausalityFromRecipes() {
	}

	public void onStart(Application app) {

		/*
		 * Basically this is a trade-off. As all Channel are in the DB, we could
		 * only pick up from it the right one just in time.
		 */
		Channel human, detector, lamp, luminosityDetector, manythings, garage;
		{
			/*
			 * TODO This is not the best way to do then we ashamefully hide it
			 * from the main scope.
			 */
			// Ebean.find(Channel.class).where(Expression) would be better
			List<Channel> channels = Ebean.find(Channel.class).findList();
			human = channels.stream().filter(x -> x.getClazz() == AllActors.Human.class).findFirst().get();
			detector = channels.stream().filter(x -> x.getClazz() == AllActors.Detector.class).findFirst().get();
			lamp = channels.stream().filter(x -> x.getClazz() == AllActors.Lamp.class).findFirst().get();
			luminosityDetector = channels.stream().filter(x -> x.getClazz() == AllActors.LuminosityDetector.class)
					.findFirst().get();
			manythings = channels.stream().filter(x -> x.getClazz() == AllActors.Manythings.class).findFirst().get();
			garage = channels.stream().filter(x -> x.getClazz() == AllActors.Garage.class).findFirst().get();
		}

		/*
		 * How to programmatically instanciate actor for a Channel. Beware of
		 * the name uniqueness constraint (if not null).
		 */
		Application.getSystemProxy().createActorOf(human, "Alice");
		Application.getSystemProxy().createActorOf(human, "Bob");
		Application.getSystemProxy().createActorOf(human, "Jean-Kevin");

		/*
		 * Example how to schedule a random action to be performed.
		 */
		Application.getScheduler().scheduleActionMessage(
				Duration.Zero(),
				Application.getSystemProxy().getStaticActorFor(lamp),
				Void -> (AllActors.Lamp.state == "OFF") ? new AllMessages.TurnOffLamp(true)
						: new AllMessages.TurnOnLamp(true), Void -> 3 * StdRandom.gaussian(5, 2));

		/*
		 * TODO Example of how to add a new recipe in the back-end side. Maybe
		 * it should be elsewhere, I don't know. Please put it at the correct
		 * place and remove this comment
		 */
		Application.getCommutator().addCausality(Application.getSystemProxy().getStaticActorFor(detector),
				AllMessages.DetectionOn.class, "TurnOnLampWhenDetectorRecipe",
				"This description should be easy to read. Not sure whether it'd avec be useful anyway ~",
				Application.getSystemProxy().getStaticActorFor(lamp),
				triggerMessage -> new AllMessages.TurnOnLamp(true));

		/*
		 * More powerful example. This might seem weird, example from previous
		 * commit should be easier (without mapper).
		 */
		Application.getCommutator().addCausality(Application.getSystemProxy().getStaticActorFor(manythings),//
				AllMessages.Manythings.MotionDetected.class,//
				"TurnOnLampWhenMovementRecipe",//
				"This description should be easy to read. Not sure whether it'd avec be useful anyway ~",//
				Application.getSystemProxy().getStaticActorFor(lamp),//
				Application.getMessageMap().getMapper(AllMessages.Manythings.MotionDetected.class, Lamp.TurnOn.class));

		System.out.println(Ebean.find(Channel.class).findRowCount());
		// if (Ebean.find(Channel.class).findRowCount() != 0) {

		List<Modality> fieldsList = Ebean.find(Modality.class).findList();
		// channelsList.removeAll(channelsList);
		for (Modality f : fieldsList) {

			System.out.println("EWWWWWWWWWWW" + f);
			f.delete();
		}

		List<Trigger> triggersList = Ebean.find(Trigger.class).findList();
		// triggersList.removeAll(triggersList);
		for (Trigger t : triggersList) {
			System.out.println(t.getClazz().getSimpleName());
			t.delete();
		}

		List<Action> actionsList = Ebean.find(Action.class).findList();
		// triggersList.removeAll(actionsList);
		for (Action a : actionsList) {
			System.out.println(a.getClazz().getSimpleName());
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

		/*
		 * Example how to schedule a random action to be performed. Here we
		 * randomly send two actions to the lamp : it will result in a somewhat
		 * erratic behaviour.
		 */
		Application.getScheduler().scheduleActionMessage(Duration.Zero(),
				Application.getSystemProxy().getStaticActorFor(lamp), new AllMessages.TurnOnLamp(true),
				Void -> 3 * StdRandom.gaussian(5, 2));
		Application.getScheduler().scheduleActionMessage(Duration.Zero(),
				Application.getSystemProxy().getStaticActorFor(lamp), new AllMessages.TurnOffLamp(true),
				Void -> 3 * StdRandom.gaussian(5, 2));

		/*
		 * The example above is poor. It's much nicer to use a function to
		 * define on-the-fly which message will be sent. Then, we cancel all
		 * we've done and we start again in a more proper way.
		 */
		Application.getScheduler().cancelAll(); // forget all we've done.
		Application.getScheduler().scheduleActionMessage(
		/* The initialisation delay */
		Duration.Zero(),
		/* The actor which will receive messages */
		Application.getSystemProxy().getStaticActorFor(lamp),
		/*
		 * This function which will be called to define each message on the fly.
		 */
		Void -> (AllActors.Lamp.state == "OFF") ? new AllMessages.TurnOffLamp(true) : new AllMessages.TurnOnLamp(true),
		/* As this function takes no argument, we show it with Void. */
		Void -> 3 * StdRandom.gaussian(5, 2));

		/*
		 * To make it clear about functions defined on the fly, this is such a
		 * function that can multiply an integer by two:
		 */
		@SuppressWarnings("unused")
		Function<Integer, Integer> multiplyByTwo0 = n -> n * 2;
		/*
		 * It's the same but the semantic is more precise to change for an unary
		 * operator:
		 */
		@SuppressWarnings("unused")
		IntUnaryOperator multiplyByTwo1 = n -> n * 2;
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");

	}
}