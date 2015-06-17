package logic;

import akka.actor.ActorRef;

public class MsgEnvelope {
	/**
	 * Defines which actors (which has suscribed) will get messages. It's a one
	 * (suscribee) to many (suscriber) relation.
	 * 
	 * Defines which message type from which actor.
	 */
	public final String messageSource;
	public final Object payload;
	/**
	 * It's the sender. In most case, this is the TriggerActor. Must not be
	 * null. If needed, uses ActorRef.noSender().
	 */
	public final ActorRef suscribee;

	public MsgEnvelope(String source, Object payload, ActorRef emitter) {
		this.messageSource = source;
		this.payload = payload;
		this.suscribee = emitter;
	}
}