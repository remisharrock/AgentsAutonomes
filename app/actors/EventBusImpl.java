package actors;

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
		Logger.info("Message " + event.payload.toString() + " commutated from " + event.suscribee.path().name()
				+ " to " + subscriber.path().name());
		Object payload = null;
		try {
			/**
			 * TODO If it doesn't work we can still had a Class attribute to
			 * MsgEnvelope but it would be less clean.
			 */
			Class<?> clazz = Class.forName(event.payload.getClass().getName());
			payload = Application.getCommutator().getMappedActionMessage(event.suscribee, clazz, event.payload);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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