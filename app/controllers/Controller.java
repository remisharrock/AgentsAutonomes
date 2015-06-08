package controllers;

import java.util.HashMap;

import actors.EventBusImpl;
import actors.MessageFactory;
import akka.actor.ActorRef;

/**
 * This is a hook. Same logic would better be implemented with Router, Mailboxes
 * and so on. Moreover, RouterActor only stands for a single JVM.
 */
@SuppressWarnings("rawtypes")
public class Controller {

	/**
	 * <TriggerActor, <TriggerMessage, Action to perform>>
	 */
	private static HashMap<ActorRef, HashMap<Class, MessageFactory>> translator = new HashMap<>();
	public static EventBusImpl bus = new EventBusImpl();

	/**
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param name
	 *            = topic. We put the formal programmatic name of the recipe, if
	 *            any. Not sure this to be really of use.
	 * @param description
	 *            Whatever you want to make this recipe easy to get. Anyway, not
	 *            that sure about whether it's useful here in the back-and or
	 *            not.
	 * @param actionActor
	 * @param actionMessageFactory
	 */
	public static void registerRecipe(ActorRef triggerActor, Class triggerMessageClass, String name,
			String description, ActorRef actionActor, MessageFactory actionMessageFactory) {
		Controller.bus.subscribe(actionActor, name);
		// Do not replace, but nicely insert into the right slot.
		if (!translator.keySet().contains(triggerActor)) {
			translator.put(triggerActor, new HashMap<Class, MessageFactory>());
		}

		HashMap<Class, MessageFactory> value = new HashMap<>();
		value.put(triggerMessageClass.getClass(), actionMessageFactory);
		translator.put(triggerActor, value);
	}

	/**
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param triggerMessage
	 *            Can be `null` if you don't need it to be tweaked.
	 * @return
	 */
	public static Object getActionMessageFromRecipe(ActorRef triggerActor, Class triggerMessageClass,
			Object triggerMessage) {
		return translator.get(triggerActor).get(triggerMessageClass).convert(triggerMessage);
	}

	public static void removeRecipe(ActorRef triggerActor, Object triggerMessage, ActorRef actionActor,
			Object actionMessage, String name, String description) {
	}

	public static void ariseTrigger() {
	}

	public static void getActionActorsFromCurrentRecipes(Object triggerMessage) {
	}

	public static void getTriggersFromCurrentRecipes(Object actionMessage) {
	}
}
