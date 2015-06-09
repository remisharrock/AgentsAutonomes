package actors;

import akka.actor.ActorRef;

public class MsgEnvelope {
	/**
	 * Defines which actors (which has suscribed) will get messages. It's a one
	 * (suscribee) to many (suscriber) relation.
	 */
	public final String topic;
	public final Object payload;
	/**
	 * It's the sender. In most case, this is the TriggerActor.
	 */
	public final ActorRef suscribee;

	public MsgEnvelope(String topic, Object payload, ActorRef emitter) {
		this.topic = topic;
		this.payload = payload;
		this.suscribee = emitter;
	}
}