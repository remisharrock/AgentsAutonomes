package world;

import akka.actor.UntypedActor;

public class Printer extends UntypedActor {

	public void onReceive(Object message) {
		unhandled(message);
	}
}