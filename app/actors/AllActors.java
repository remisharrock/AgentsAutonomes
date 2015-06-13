package actors;

import java.time.Duration;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Supplier;

import actors.RandomScheduler.StopCriteria;
import akka.actor.UntypedActor;

public final class AllActors {
	private AllActors() {
	}

	public static class BasicPresenceDetector extends UntypedActor {

		@Override
		public void onReceive(Object message) throws Exception {
			/*
			 * This is just a basic detector, it can't handle message.
			 */
			unhandled(message);
		}
	}

	public static class PresenceDetector extends UntypedActor {

		/**
		 * Basic history. Better to have an HashMap.
		 */
		private CopyOnWriteArrayList<Object> history;
		private RandomScheduler innerRandomScheduler;

		public PresenceDetector() {
			history = new CopyOnWriteArrayList<>();
			innerRandomScheduler = new RandomScheduler();
		}

		@Override
		public void onReceive(Object message) throws Exception {
			history.add(message);
			/*
			 * Nothing for now.
			 */
			unhandled(message);
		}

		/**
		 * This is a clever actor so it can understand how to simulate fake
		 * triggers.
		 */
		public CancellableRef scheduleTrigger(Duration init, Supplier<Duration> randomFunction,
				StopCriteria stopCriteria, Runnable eventFunction) {
			return innerRandomScheduler.addCancellableRef(init, randomFunction, stopCriteria, eventFunction);
		}
	}

	public static class Lamp extends UntypedActor {
		public static boolean state = false;

		public void onReceive(Object message) {
			if (message instanceof AllMessages.Lamp.TurnOff) {
				state = false;

			} else if (message instanceof AllMessages.Lamp.TurnOn) {
				AllMessages.Lamp.TurnOn mess = (AllMessages.Lamp.TurnOn) message;
				// Access messages fields.
				mess.getColour();
				state = true;
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
