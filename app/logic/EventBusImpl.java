package logic;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import play.Logger;
import akka.actor.ActorRef;
import akka.event.japi.LookupEventBus;
import controllers.Application;

/**
 * Within the creation of a recipe, actors are made suscribers to this bus with
 * a specific topic. The link between triggering actor and the performer is made
 * by the topic.
 */
public class EventBusImpl extends LookupEventBus<MsgEnvelope, ActorRef, String> {

	// is used for extracting the classifier from the incoming events
	@Override
	public String classify(MsgEnvelope event) {
		return event.messageSource;
	}

	// will be invoked for each event for all subscribers which registered
	// themselves for the event's classifier
	@Override
	public void publish(MsgEnvelope event, ActorRef subscriber) {
		try {
			Logger.info("Message " + event.payload.getClass().getName() + " commutated from "
					+ URLDecoder.decode(event.suscribee.path().name(), "UTF-8") + " to "
					+ URLDecoder.decode(subscriber.path().name(), "UTF-8"));
		} catch (UnsupportedEncodingException e1) {
		}
		Object payload = null;
		try {
			/**
			 * TODO If it doesn't work we can still had a Class attribute to
			 * MsgEnvelope but it would be less clean.
			 */
			Class<?> clazz = Class.forName(event.payload.getClass().getName());
			payload = Application.getCommutator().getMappedActionMessage(event.suscribee, clazz, subscriber,
					event.payload);
		} catch (ClassNotFoundException e) {
			Logger.info("SEVERE in EventBusImpl: ClassNotFoundException");
		}
		/**
		 * <p>
		 * Important to read.
		 * </p>
		 * <p>
		 * Wow, hey wait, didn't you tell us it's impossible for the trigger
		 * channel to immediately speak to the action channel? Well, actually
		 * it's true, but the reason is the trigger channel can't decide by
		 * itself which action message will be sent. Here we perfectly see that
		 * the payload is not at all defined by the trigger channel, then the
		 * actor model isn't broken.
		 * </p>
		 */
		try {
			Thread.sleep(StdRandom.poisson(150));
		} catch (InterruptedException e) {
			/*
			 * Don't output it, it's to simulate a delay from the communication
			 * medium (for example, wifi).
			 */
		}
		subscriber.tell(payload, event.suscribee);
	}

	// must define a full order over the subscribers, expressed as expected from
	// `java.lang.Comparable.compare`
	@Override
	public int compareSubscribers(ActorRef a, ActorRef b) {
		return a.compareTo(b);
	}

	// determines the initial size of the index data structure
	// used internally (i.e. the expected number of different classifiers)
	@Override
	public int mapSize() {
		// should be enough
		return 128;
	}

}