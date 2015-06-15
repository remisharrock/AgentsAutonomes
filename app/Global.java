import java.util.ArrayList;
import java.util.Arrays;
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
import play.db.ebean.Model;
import scala.concurrent.duration.Duration;
import actors.AllActors;
import actors.AllMessages;
import actors.AllMessages.Lamp;
import actors.RandomScheduler.StopCriteria;
import actors.StdRandom;

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
		// DBerase();
		// DBpopulate();

	}

	private void generateStaticCausalityFromRecipes() {
		Ebean.find(Recipe.class)
				.findList()
				.forEach(
						recipe -> Application.getCommutator().addCausalRelation(
								Application.getSystemProxy().getOrCreateStaticActorFor(recipe.getTriggerChannel()),
								recipe.getTrigger().getClazz(),
								recipe.getDescription(),
								Application.getSystemProxy().getOrCreateStaticActorFor(recipe.getActionChannel()),
								Application.getMessageMap().getMapper(recipe.getTrigger().getClazz(),
										recipe.getAction().getClazz())));
	}

	private void generateCausalityFromRecipes() {
	}

	public void onStart(Application app) {

		Logger.info("\n\n\nHear me from Global");

		/*
		 * First, to make it clear about functions defined on the fly, this is
		 * such a function that can multiply an integer by two:
		 */
		@SuppressWarnings("unused")
		Function<Integer, Integer> multiplyByTwo0 = n -> n * 2;
		/*
		 * It's the same but the semantic is more precise to change for an unary
		 * operator:
		 */
		@SuppressWarnings("unused")
		IntUnaryOperator multiplyByTwo1 = n -> n * 2;

		int thisWillBeFour = multiplyByTwo0.apply(2);
		List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
		int result = list.stream().filter(x -> x > 7).map(multiplyByTwo0).reduce(Integer::sum).get();
		boolean thisWillBeTrue = (result == 2 * (8 + 9));

		generateStaticCausalityFromRecipes();
		generateCausalityFromRecipes();

		/*
		 * Basically this is a trade-off. As all Channel are in the DB, we could
		 * only pick up from it the right one just in time.
		 */
		Channel detector, lamp, luminosityDetector, manythings, garage;
		{
			/*
			 * TODO This is not the best way to do then we ashamefully hide it
			 * from the main scope.
			 */
			// Ebean.find(Channel.class).where(Expression) would be better
			List<Channel> channels = Ebean.find(Channel.class).findList();
			detector = channels.stream().filter(x -> x.getClazz() == AllActors.BasicPresenceDetector.class).findFirst()
					.get();
			lamp = channels.stream().filter(x -> x.getClazz() == AllActors.Lamp.class).findFirst().get();
			luminosityDetector = channels.stream().filter(x -> x.getClazz() == AllActors.LuminosityDetector.class)
					.findFirst().get();
			manythings = channels.stream().filter(x -> x.getClazz() == AllActors.Manythings.class).findFirst().get();
			garage = channels.stream().filter(x -> x.getClazz() == AllActors.Garage.class).findFirst().get();
		}

		/*
		 * How to programmatically instanciate actor for a Channel. Beware of
		 * the name uniqueness constraint (if not null) as defined by akka. The
		 * first actor created will be referenced as static actor.
		 */
		// Application.getSystemProxy().createActorOf(new Channel(), "Alice").;
		// Application.getSystemProxy().createActorOf(human, "Bob");
		// Application.getSystemProxy().createActorOf(human, "Jean-Kevin");

		/*
		 * Example how to schedule a random action to be performed. This example
		 * doesn't represent reality well because the detector is saying
		 * explicitly to the lamp to turn itself on. Moreover, this signal could
		 * be the trigger of several other causality. In the real world, when a
		 * signal is raised, all causality are triggered.
		 * 
		 * However, this syntax may be useful for some cases.
		 */
		Application.getScheduler().addRandomIssue(
				Duration.Zero(),
				() -> java.time.Duration.ofSeconds((long) (3 * StdRandom.gaussian(5, 2))),
				StopCriteria.set(StopCriteria.OCCURENCE, 5),//
				() -> {
					Application
							.getSystemProxy()
							.getOrCreateStaticActorFor(lamp)
							.tell(new AllMessages.Lamp.ChangeState(true, "turquoise", 4, false),
									Application.getSystemProxy().getOrCreateStaticActorFor(detector));
				});
		/*
		 * Example how to schedule a random action to be performed. This example
		 * is closer to the reality and use the `Commutator` object. This
		 * embraces rhe general case.
		 */
		Application.getScheduler().addRandomIssue(
				Duration.Zero(),
				() -> java.time.Duration.ofSeconds((long) (3 * StdRandom.gaussian(5, 2))),
				StopCriteria.set(StopCriteria.OCCURENCE, 5),//
				() -> {
					Application.getCommutator().emitTriggerMessage(
							Application.getSystemProxy().getOrCreateStaticActorFor(detector),
							AllMessages.Lamp.ChangeState.class, () -> {
								String colour = "AAEFAA";
								int intensity = 10 * (int) StdRandom.gaussian(5, 2);
								boolean lowConsumptionMode = true;
								return new AllMessages.Lamp.ChangeState(true, colour, intensity, lowConsumptionMode);
							});
				});

		/*
		 * TODO Example of how to add a new recipe in the back-end side. Maybe
		 * it should be elsewhere, I don't know. Please put it at the correct
		 * place and remove this comment
		 */
		Application.getCommutator().addCausalRelation(Application.getSystemProxy().getOrCreateStaticActorFor(detector),
				AllMessages.Lamp.ChangeState.class,
				"This description should be easy to read. Not sure whether it'd avec be useful anyway ~",
				Application.getSystemProxy().getOrCreateStaticActorFor(lamp),
				triggerMessage -> new AllMessages.Lamp.ChangeState(true, "turquoise", 4, false));

		/*
		 * More powerful example. As this might seem weird, example from
		 * previous commit should be easier (without mapper).
		 */
		Application.getCommutator().addCausalRelation(
				Application.getSystemProxy().getOrCreateStaticActorFor(manythings),//
				AllMessages.Manythings.MotionDetected.class,//
				"This description should be easy to read. Not sure whether it'd avec be useful anyway ~",//
				Application.getSystemProxy().getOrCreateStaticActorFor(lamp),//
				Application.getMessageMap().getMapper(AllMessages.Manythings.MotionDetected.class,
						Lamp.ChangeState.class));

		System.out.println(Ebean.find(Channel.class).findRowCount());
		// if (Ebean.find(Channel.class).findRowCount() != 0) {
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
	private void DBpopulate() {// Users
		User user1 = new User("1", "1", "user", "home1");
		user1.save();

		User user2 = new User("2", "2", "administrator", "home1");
		user2.save();

		// We can't have human channel : it's not a channel as define as object
		// from IoT.

		Channel manythings, garage;

		/*
		 * Triggers and Actions are needed only for the interface. If we keep
		 * programmatically working on causality, we don't need them.
		 */
		List<Trigger> triggers = new ArrayList<Trigger>();
		List<Action> actions = new ArrayList<Action>();

		(new Channel(triggers, actions, AllActors.Manythings.class, "Manythings")).save();
		(new Channel(triggers, actions, AllActors.Lamp.class, "Manythings")).save();
		(new Channel(triggers, actions, AllActors.PresenceDetector.class, "Manythings")).save();

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
}