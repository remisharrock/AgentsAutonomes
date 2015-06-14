package actors;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.Duration;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Supplier;

import play.Logger;
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
		public void onReceive(Object message) {
			history.add(message);
			try {
				Logger.info("PresenceDetector " + URLDecoder.decode(getSelf().path().name(), "UTF-8")
						+ " received message " + message.toString());
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
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
			return innerRandomScheduler.addRandomIssue(init, randomFunction, stopCriteria, eventFunction);
		}
	}

	public static class Lamp extends UntypedActor {
		private Boolean state = null;
		private String colour = null;
		private Integer intensity = null;
		private Boolean lowConsumptionMode = null;

		public void onReceive(Object message) {
			try {
				Logger.info("Lamp " + URLDecoder.decode(getSelf().path().name(), "UTF-8") + " received message "
						+ message.toString());
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (message instanceof AllMessages.Lamp.ChangeState) {
				AllMessages.Lamp.ChangeState action = (AllMessages.Lamp.ChangeState) message;
				this.colour = (action.getColour() == null) ? this.colour : action.getColour();
				this.intensity = (action.getIntensity() == null) ? this.intensity : action.getIntensity();
				this.lowConsumptionMode = (action.getLowConsumptionMode() == null) ? this.lowConsumptionMode : action
						.getLowConsumptionMode();
				this.state = (action.getState() == null) ? this.state : action.getState();
				try {
					Logger.info("Lamp " + URLDecoder.decode(getSelf().path().name(), "UTF-8")
							+ " state is now: {colour=" + this.colour + ", intensity=" + this.intensity + ", low="
							+ this.lowConsumptionMode + ", state=" + this.state);
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} else
				unhandled(message);
		}

		public Boolean getState() {
			return state;
		}

		public String getColour() {
			return colour;
		}

		public Integer getIntensity() {
			return intensity;
		}

		public Boolean getLowConsumptionMode() {
			return lowConsumptionMode;
		}

		public void setLowConsumptionMode(Boolean lowConsumptionMode) {
			this.lowConsumptionMode = lowConsumptionMode;
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
