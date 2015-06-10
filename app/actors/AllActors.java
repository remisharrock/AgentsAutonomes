package actors;

import messages.AllMessages.DetectionOff;
import messages.AllMessages.DetectionOn;
import messages.AllMessages.EnterRoom;
import messages.AllMessages.ExitRoom;
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.Props;
import akka.actor.UntypedActor;

public final class AllActors {
	private AllActors() {
	}

	public final static ActorSystem system = ActorSystem.create("helloakka");
	public final static RandomScheduler random = new RandomScheduler(system);

	public final static ActorRef human = system.actorOf(Props.create(Human.class), "human");
	public final static ActorRef detector = system.actorOf(Props.create(Detector.class), "detector");
	public final static ActorRef lamp = system.actorOf(Props.create(Lamp.class), "lamp");
	public final static ActorRef luminosityDetector = system.actorOf(Props.create(LuminosityDetector.class),
			"luminosityDetector");

	public static class Human extends UntypedActor {
		String state = "";

		public void onReceive(Object message) {
		}
	}

	public static class Detector extends UntypedActor {

		String state = "";

		@Override
		public void onReceive(Object message) throws Exception {
			// TODO Auto-generated method stub
			if (message instanceof EnterRoom) {
				System.out.println("Detector Actor: DETECTION ON");
				if (((EnterRoom) message).getChangeState())
					lamp.tell(new DetectionOn(true), getSelf());
				else
					lamp.tell(new DetectionOn(false), getSelf());

				state = "Detector: Someone entered the room";
			} else if (message instanceof ExitRoom) {
				// Send the current greeting back to the sender
				System.out.println("Detector Actor: DETECTION OFF");
				if (((ExitRoom) message).getChangeState())
					lamp.tell(new DetectionOff(true), getSelf());
				else
					lamp.tell(new DetectionOff(false), getSelf());
				state = "Detector: Someone left the room";
			} else
				unhandled(message);
		}
	}

	public static class Lamp extends UntypedActor {
		public static String state = "OFF";

		public void onReceive(Object message) {
			if (message instanceof DetectionOn) {
				if (((DetectionOn) message).getChangeState()) {
					System.out.println("Lamp Actor: LAMP ON");
					state = "ON";
				} else {
					System.out.println("Detection ok But LAMP state didn't change");
				}
			}

			else if (message instanceof DetectionOff) {
				// Send the current greeting back to the sender
				if (((DetectionOff) message).getChangeState()) {
					System.out.println("Lamp Actor: LAMP OFF");
					state = "OFF";
				} else {
					System.out.println("Detection ok But LAMP state didn't change");
				}
			} else
				unhandled(message);
		}
	}

	public static class LuminosityDetector extends UntypedActor {

		public void onReceive(Object message) {

			unhandled(message);
		}
	}

}
