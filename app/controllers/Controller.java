package controllers;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.util.function.UnaryOperator;

import scala.concurrent.Future;
import scala.concurrent.duration.Duration;
import actors.EventBusImpl;
import actors.MsgEnvelope;
import actors.RandomScheduler;
import akka.actor.ActorPath;
import akka.actor.ActorRef;
import akka.actor.ActorSystem;

/**
 * This is a hook. Same logic would better be implemented with Router, Mailboxes
 * and so on. Moreover, RouterActor only stands for a single JVM.
 */
@SuppressWarnings("rawtypes")
public class Controller {

	private static Controller controller;
	private ActorSystem system;
	/**
	 * There is one here but you're able to create as much as you want. For
	 * example, one may use to set one for each device group.
	 */
	private RandomScheduler scheduler;

	public static Controller get() {
		if (controller == null) {
			controller = new Controller();
		}
		return Controller.controller;
	}

	public ActorSystem system() {
		return system;
	}

	public RandomScheduler getScheduler() {
		return scheduler;
	}

	private Controller() {
		this.system = ActorSystem.create("helloakka");
		this.scheduler = new RandomScheduler();
	}

	/**
	 * <TriggerActor, <TriggerMessage, Action to perform>>
	 */
	private HashMap<ActorRef, HashMap<Class, UnaryOperator<Object>>> translator = new HashMap<>();
	private EventBusImpl eventBus = new EventBusImpl();

	/**
	 * <p>
	 * Here we perform two tasks: we let actionActor suscribe to the EventBus
	 * and insert triggerActor to the internal HashMap translator.
	 * </p>
	 * <p>
	 * This controller appears in three main use cases:
	 * <ul>
	 * <li>When a recipe is created. Here is a snippet:</li>
	 * 
	 * <pre>
	 * Controller.get().registerRecipe(AllActors.detector, AllMessages.DetectionOn.class, &quot;&quot;,
	 * 		&quot;This description should be easy to read. Not sure whether it'd avec be useful anyway &tilde;&quot;, AllActors.lamp,
	 * 		triggerMessage -&gt; new AllMessages.TurnOnLamp(true));
	 * </pre>
	 * 
	 * <li>When an actor broadcasts a trigger, it sends an event to the bus.
	 * More precisely, we currently send a MsgEnvelope which contains the
	 * message. All subscribers get a copy of the contained message.</li>
	 * <li></li>
	 * </ul>
	 * </p>
	 * 
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param name
	 *            = topic. We put the formal programmatic name of the recipe, if
	 *            any. Is has to be unique.
	 * @param description
	 *            Whatever you want to make this recipe easy to get. Anyway, not
	 *            that sure about whether it's useful here in the back-and or
	 *            not.
	 * @param actionActor
	 * @param actionMessageFactory
	 *            can not be null
	 */
	public void registerRecipe(ActorRef triggerActor, Class triggerMessageClass, String name, String description,
			ActorRef actionActor, UnaryOperator<Object> actionFunction) {

		/*
		 * Just allows one. The first part is about actionActor.
		 */
		eventBus.subscribe(actionActor, name);

		/*
		 * The second part is about triggerActor.
		 */
		// Do not replace, but nicely insert it into the right slot.
		if (!translator.keySet().contains(triggerActor)) {
			translator.put(triggerActor, new HashMap<Class, UnaryOperator<Object>>());
		}
		HashMap<Class, UnaryOperator<Object>> value = new HashMap<>();
		value.put(triggerMessageClass.getClass(), actionFunction);
		translator.put(triggerActor, value);
	}

	public void registerRecipe(ActorPath triggerActor, Class triggerMessageClass, String name, String description,
			ActorPath actionActor, UnaryOperator<Object> actionFunction) {

		Future<ActorRef> a = system.actorSelection(triggerActor).resolveOne(Duration.apply(2, TimeUnit.SECONDS));

	}

	/**
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param triggerMessage
	 *            Can be `null` if you don't need it to be tweaked.
	 * @return
	 */
	public Object getActionMessageFromRecipe(ActorRef triggerActor, Class triggerMessageClass, Object triggerMessage) {
		return translator.get(triggerActor).get(triggerMessageClass).apply(triggerMessage);
	}

	/**
	 * You have to unregister your recipe when you set it inactive.
	 * 
	 * @param triggerActor
	 * @param triggerMessage
	 * @param actionActor
	 * @param actionMessage
	 * @param name
	 * @param description
	 */
	public void unregisterRecipe(ActorRef triggerActor, Object triggerMessage, ActorRef actionActor,
			Object actionMessage, String name, String description) {
		// TODO
	}

	/**
	 * Hint: please keep in mind this method is not the same as the overrided
	 * `publish(MsgEnvelope event, ActorRef subscriber)` in EventBusImpl: the
	 * latter specifically invoke actor.tell while this one is general. Event
	 * passed to this one will be internally filtered.
	 * 
	 * @param event
	 */
	public void publish(MsgEnvelope event) {
		eventBus.publish(event);
	}

	public void getActionActorsFromCurrentRecipes(Object triggerMessage) {
	}

	public void getTriggersFromCurrentRecipes(Object actionMessage) {
	}
}
