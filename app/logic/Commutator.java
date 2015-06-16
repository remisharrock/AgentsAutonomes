package logic;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

import play.Logger;
import akka.actor.ActorRef;

@SuppressWarnings("rawtypes")
public class Commutator {

	private EventBusImpl eventBus = new EventBusImpl();
	// private HashMap<ActorRef, HashMap<Class, UnaryOperator<Object>>>
	// causalRelations = new HashMap<>(eventBus.mapSize());
	/*
	 * We can take advantage of Java 8 and remove the former weird map of map
	 * for a cleaner set.
	 */
	private CopyOnWriteArraySet<CausalRelation> causalSet = new CopyOnWriteArraySet<>();

	/* Here we could define some functionnal interface if willing to. */
	private Predicate<CausalRelation> getUnicityPredicate(ActorRef triggerActor, Class<?> triggerMessageClass,
			ActorRef actionActor) {
		return x -> x.getTriggerActor() == triggerActor && x.getActionActor() == actionActor
				&& x.getTriggerMessageClass() == triggerMessageClass;
	}

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
	 * @param description
	 *            Whatever you want to make this recipe easy to get. Anyway, not
	 *            that sure about whether it's useful here in the back-and or
	 *            not. Actually you still have TODO implement an use of it.
	 *            However, even if this field is unused, most of the time it
	 *            will incitate the developper to write a chunk of text to
	 *            describe what they're doing then it can't be bad.
	 * @param actionActor
	 * @param mapper
	 *            can not be null
	 * @param label
	 */
	public void addCausalRelation(ActorRef triggerActor, Class<?> triggerMessageClass, String description,
			ActorRef actionActor, UnaryOperator<Object> mapper, List<String> label) {

		/*
		 * Safety check
		 */
		if (label == null) {
			label = new ArrayList<String>();
		}

		// First part: triggerActor.

		if (causalSet.stream().anyMatch(getUnicityPredicate(triggerActor, triggerMessageClass, actionActor))) {
			Logger.info("SEVERE: causal relation already defined, not overwritten.");
		} else {
			causalSet
					.add(new CausalRelation(triggerActor, triggerMessageClass, description, actionActor, mapper, label));
		}

		// Second part : action actor.

		/*
		 * This is a one-to-one commutated relation. Each message is unique (see
		 * publish(MsgEnvelope event, ActorRef subscriber) of EventBusImpl to
		 * convince yourself).
		 */
		eventBus.subscribe(actionActor, triggerActor.path().toString() + triggerMessageClass.getName());
	}

	/**
	 * Syntactic sugar
	 * 
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param description
	 * @param actionActor
	 * @param mapper
	 */
	public void addCausalRelation(ActorRef triggerActor, Class<?> triggerMessageClass, String description,
			ActorRef actionActor, UnaryOperator<Object> mapper) {
		addCausalRelation(triggerActor, triggerMessageClass, description, actionActor, mapper, null);
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
	public void removeCausalRelation(ActorRef triggerActor, Class<?> triggerMessageClass, ActorRef actionActor) {

		// First part: triggerActor.
		causalSet.removeIf(getUnicityPredicate(triggerActor, triggerMessageClass, actionActor));

		// Second part : action actor. This is a one-to-one relation.

		eventBus.unsubscribe(actionActor, triggerActor.path().toString() + triggerMessageClass.getName());

	}

	/**
	 * 
	 * @param triggerActor
	 * @param triggerMessageClass
	 * @param actionActor
	 * @param triggerMessage
	 * @return
	 */
	public Object getMappedActionMessage(ActorRef triggerActor, Class triggerMessageClass, ActorRef actionActor,
			Object triggerMessage) {
		return causalSet.stream().filter(getUnicityPredicate(triggerActor, triggerMessageClass, actionActor))
				.findFirst().get().getMapper().apply(triggerMessage);
	}

	/**
	 * It's defined but quite loosy. From now we just need to find it a use.
	 * 
	 * @param labelPredicate
	 * @return
	 */
	public Set<CausalRelation> getCausalRelationByLabel(Predicate<List<String>> labelPredicate) {
		return this.causalSet.stream().filter(x -> labelPredicate.test(x.getLabel())).collect(Collectors.toSet());
	}

	/**
	 * Hint: please keep in mind this method is not the same as the overrided
	 * `publish(MsgEnvelope event, ActorRef subscriber)` in EventBusImpl: the
	 * latter specifically invoke actor.tell while this one is general. Event
	 * passed to this one will be internally filtered.
	 * 
	 * TODO remove the triggerClass for something more witty.
	 * 
	 * @param event
	 */
	public void emitTriggerMessage(ActorRef triggerActor, Class<?> triggerClass, Supplier<Object> triggerSupplier) {
		eventBus.publish(new MsgEnvelope(triggerActor.path().toString() + triggerClass.getName(),
				triggerSupplier.get(), triggerActor));
	}

	/**
	 * Export as graph picture reference for Gephi. Filter and only show
	 * relations which satisfy the predicate. You can use labels here if you
	 * want.
	 */
	public File exportCausalGraph(Predicate<CausalRelation> predicate) {
		return null;
	}
}
