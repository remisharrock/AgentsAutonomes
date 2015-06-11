package actors;

import java.util.HashMap;
import java.util.function.UnaryOperator;

import akka.actor.ActorRef;

@SuppressWarnings("rawtypes")
public class Commutator {

	private EventBusImpl eventBus = new EventBusImpl();
	private HashMap<ActorRef, HashMap<Class, UnaryOperator<Object>>> causality = new HashMap<>(eventBus.mapSize());

	public Commutator() {
	}

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
	public void addCausality(ActorRef triggerActor, Class<?> triggerMessageClass, String name, String description,
			ActorRef actionActor, UnaryOperator<Object> actionFunction) {

		// First part: triggerActor.

		if (causality.get(triggerActor) == null) {
			causality.put(triggerActor, new HashMap<Class, UnaryOperator<Object>>());
		}
		HashMap<Class, UnaryOperator<Object>> value = new HashMap<>();
		value.put(triggerMessageClass, actionFunction);
		causality.put(triggerActor, value);

		// Second part : action actor. This is a one-to-one relation.

		eventBus.subscribe(actionActor, name);
	}

	/**
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param triggerMessage
	 *            Can be `null` if you don't need it to be tweaked.
	 * @return
	 */
	public Object getActionMessageFromRecipe(ActorRef triggerActor, Class triggerMessageClass, Object triggerMessage) {
		return causality.get(triggerActor).get(triggerMessageClass).apply(triggerMessage);
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
	public void removeCausality(ActorRef triggerActor, Object triggerMessage, ActorRef actionActor,
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
	void publish(MsgEnvelope event) {
		eventBus.publish(event);
	}
}
