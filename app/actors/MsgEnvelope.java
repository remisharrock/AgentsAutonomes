package actors;

import akka.actor.ActorRef;

public class MsgEnvelope {
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