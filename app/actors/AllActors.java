package actors;

import controllers.Controller;
import actors.AllMessages.DetectionOff;
import actors.AllMessages.DetectionOn;
import actors.AllMessages.EnterRoom;
import actors.AllMessages.ExitRoom;
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.Props;
import akka.actor.UntypedActor;

public final class AllActors {
	private AllActors() {
	}

	public static ActorSystem system = Controller.get().getSystem();

	public static ActorRef human;
	public static ActorRef detector;
	public static ActorRef lamp;
	public static ActorRef luminosityDetector;
	public static ActorRef manythings;
	public static ActorRef garage;

	{
		human = system.actorOf(Props.create(Human.class), "human");
		detector = system.actorOf(Props.create(Detector.class), "detector");
		lamp = system.actorOf(Props.create(Lamp.class), "lamp");
		luminosityDetector = system.actorOf(Props.create(LuminosityDetector.class), "luminosityDetector");
		manythings = system.actorOf(Props.create(Manythings.class), "manythings");
		garage = system.actorOf(Props.create(Garage.class), "garage");
	}

	public static class Human extends UntypedActor {
		String state = "";

		public void onReceive(Object message) {
		}
	}

	public static class Detector extends UntypedActor {

		String state = "";

		@Override
		public void onReceive(Object message) throws Exception {
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

	public static class Bttn extends UntypedActor {

		private Integer deviceId;

		public Integer getDeviceId() {
			return this.deviceId;
		}

		public void onReceive(Object message) {
			System.out.println("No Actions available on that device");
			unhandled(message);
		}
	}

	public static class Garage extends UntypedActor {

		private Integer doorId = null;
		public boolean state;

		public Integer getDoorId() {
			return this.doorId;
		}

		public void onReceive(Object message) {
			if (message instanceof AllMessages.Garage.Open) {
			} else if (message instanceof AllMessages.Garage.Close) {
			} else {
				unhandled(message);
			}
		}
	}

	public static class Manythings extends UntypedActor {

		private Integer deviceId;

		public Integer getDeviceId() {
			return this.deviceId;
		}

		/**
		 * This Action will change the Manything settings so that video is
		 * captured using the front facing camera.
		 * 
		 * @return
		 */
		public static boolean getUseFrontFacingCamera() {
			return UseFrontFacingCamera;
		}

		public static void setUseFrontFacingCamera(boolean useFrontFacingCamera) {
			UseFrontFacingCamera = useFrontFacingCamera;
		}

		/**
		 * This Action will change the Manything settings so that video is
		 * captured using the rear facing camera.
		 * 
		 * @return
		 */
		public static boolean getUseRearFacingCamera() {
			return !UseFrontFacingCamera;
		}

		public static void setUseRearFacingCamera(boolean useRearFacingCamera) {
			UseFrontFacingCamera = !useRearFacingCamera;
		}

		/**
		 * This Action will start your Manything camera recording. NOTE: the
		 * Manything app must be open at the recording screen on the device you
		 * specify.
		 * 
		 * @return
		 */
		public static boolean getRecording() {
			return Recording;
		}

		public static void setRecording(boolean recording) {
			Recording = recording;
		}

		public static boolean getCameraFlashlight() {
			return CameraFlashlight;
		}

		public static void setCameraFlashlight(boolean cameraFlashlight) {
			CameraFlashlight = cameraFlashlight;
		}

		public static boolean getMuteAudio() {
			return MuteAudio;
		}

		public static void setMuteAudio(boolean muteAudio) {
			MuteAudio = muteAudio;
		}

		public static int getTimeIntervalBetweenStills() {
			return TimeIntervalBetweenStills;
		}

		public static void setTimeIntervalBetweenStills(int timeIntervalBetweenStills) {
			TimeIntervalBetweenStills = timeIntervalBetweenStills;
		}

		public static int getMotionSensitivityThreshold() {
			return MotionSensitivityThreshold;
		}

		public static void setMotionSensitivityThreshold(int motionSensitivityThreshold) {
			MotionSensitivityThreshold = motionSensitivityThreshold;
		}

		public static int getMultipleCameraSettings() {
			return MultipleCameraSettings;
		}

		public static void setMultipleCameraSettings(int multipleCameraSettings) {
			MultipleCameraSettings = multipleCameraSettings;
		}

		private static boolean UseFrontFacingCamera;
		private static boolean Recording;
		private static boolean CameraFlashlight;
		private static boolean MuteAudio;
		private static int TimeIntervalBetweenStills;
		private static int MotionSensitivityThreshold;
		private static int MultipleCameraSettings;

		public void onReceive(Object message) {
			unhandled(message);
		}
	}

	public static class Printer extends UntypedActor {

		public void onReceive(Object message) {
			unhandled(message);
		}
	}

}
