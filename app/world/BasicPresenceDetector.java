package world;

import akka.actor.UntypedActor;

public class BasicPresenceDetector extends UntypedActor {

	@Override
	public void onReceive(Object message) throws Exception {
		/*
		 * This is just a basic detector, it can't handle message.
		 */
		unhandled(message);
	}
}
