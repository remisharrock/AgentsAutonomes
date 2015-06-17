package actors;

import java.util.HashMap;

import messages.AllMessages;
import messages.AllMessages.MessageEnvelope;
import models.RecipeAkka;
import akka.actor.ActorSystem;
import akka.actor.UntypedActor;

/**
 * static class ActorXX will allow Class.forName("actors.AllActors$" +
 * classNameFull) to work :)
 * 
 * As it is, you've got ActorXX as an inner class, which (by definition) is
 * associated with a particular instance of AllActors (even if it never uses or
 * refers to it), which means it's an error to say new ActorXX(); without having
 * a particular AllActors instance in scope.
 * 
 * If you declare it as a static class instead, then it's a "nested" class,
 * which doesn't need a particular Hello instance.
 */
public class AllActors {
	private AllActors() {
	}

	public final static ActorSystem system = ActorSystem.create("helloakka");

	// public final static ActorRef humanActor =
	// system.actorOf(Props.create(HumanActor.class), "human");
	// public final static ActorRef detectorActor =
	// system.actorOf(Props.create(DetectorActor.class), "detector");
	// public final static ActorRef lampActor =
	// system.actorOf(Props.create(LampActor.class), "lamp");
	// public final static ActorRef luminosityDetectorActor =
	// system.actorOf(Props.create(LuminosityDetectorActor.class),
	// "luminosityDetector");

	public static class ActorRouter extends UntypedActor {
		String userGroup = "";

		public ActorRouter(String userGroup) {
			this.userGroup = userGroup;
		}

		public void setUserGroup(String userGroup) {
			this.userGroup = userGroup;
		}

		public ActorRouter() {
		}

		@Override
		public void onReceive(Object message) throws Exception {
			System.out.println(AllMessages.getMapClassNameMessage().containsValue(message));
			System.out.println("class: " + message);
			MessageEnvelope me = (MessageEnvelope) message;
			RecipeAkka ra = me.getRecipeAkka();
			ra.getActionChannelActor().tell(ra.getActionMessage(), getSelf());
		}

	}

	public static class HumanActor extends UntypedActor {
		String state = "";
		String id;

		public HumanActor(String id) {
			id = this.id;
		}

		public HumanActor() {

		}

		public void onReceive(Object message) {
		}
	}

	public static class DetectorActor extends UntypedActor {

		String state = "";
		String id;

		public DetectorActor(String id) {
			id = this.id;
		}

		public DetectorActor() {

		}

		@Override
		public void onReceive(Object message) throws Exception {
			// TODO Auto-generated method stub
			// if (message instanceof EnterRoom) {
			// System.out.println("Detector Actor: DETECTION ON");
			// if (((EnterRoom) message).getChangeState())
			// lampActor.tell(new DetectionOn(true), getSelf());
			// else lampActor.tell(new DetectionOn(false), getSelf());
			//
			// state = "Detector: Someone entered the room";
			// }
			// else if (message instanceof ExitRoom) {
			// // Send the current greeting back to the sender
			// System.out.println("Detector Actor: DETECTION OFF");
			// if (((ExitRoom) message).getChangeState())
			// lampActor.tell(new DetectionOff(true), getSelf());
			// else lampActor.tell(new DetectionOff(false), getSelf());
			// state = "Detector: Someone left the room";
			// }
			// else unhandled(message);
		}
	}

	public static class LampActor extends UntypedActor {
		public String state = "OFF";

		// This constructor is necessary
		public LampActor() {
		}

		public void onReceive(Object message) {
			if (message instanceof AllMessages.TurnOffLampMessage) {
				state = "OFF";
			} else if (message instanceof AllMessages.TurnOnLampMessage) {
				AllMessages.TurnOnLampMessage lampMessage = (AllMessages.TurnOnLampMessage) message;
				if (lampMessage.getField() != null) {
					state = "ON with" + lampMessage.getField().getName() + " is " + lampMessage.getField().getValue();
				} else {
					state = "ON";
				}
			}

			System.out.println("Lamp is now of state: " + state);
			//
			// else if (message instanceof DetectionOff) {
			// // Send the current greeting back to the sender
			// if (((DetectionOff) message).getChangeState()) {
			// System.out.println("Lamp Actor: LAMP OFF");
			// state = "OFF";
			// } else {
			// System.out.println("Detection ok But LAMP state didn't change");
			// }
			// }
			// else unhandled(message);
		}
	}

	public static class LuminosityDetectorActor extends UntypedActor {

		String id;

		public LuminosityDetectorActor(String id) {
			id = this.id;
		}

		public LuminosityDetectorActor() {
		}

		public void onReceive(Object message) {

			unhandled(message);
		}
	}
}
