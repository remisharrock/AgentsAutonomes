package world;

import java.io.Serializable;

import javax.xml.bind.TypeConstraintException;

import akka.actor.UntypedActor;

public class Manythings extends UntypedActor {

	private Integer deviceId;

	public Integer getDeviceId() {
		return this.deviceId;
	}

	/**
	 * This Action will change the Manything settings so that video is captured
	 * using the front facing camera.
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
	 * This Action will change the Manything settings so that video is captured
	 * using the rear facing camera.
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

	/**
	 * This Action will change the Manything settings so that video is captured
	 * using the front facing camera.
	 */
	public static class UseFrontFacingCamera implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public UseFrontFacingCamera(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will start your Manything camera recording. NOTE: the
	 * Manything app must be open at the recording screen on the device you
	 * specify.
	 */
	public static class StartRecording implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;
		private int recordingDuration;

		public Integer getDeviceId() {
			return deviceId;
		}

		/**
		 * @return recordingDuration in seconds
		 */
		public int getrecordingDuration() {
			return recordingDuration;
		}

		/**
		 * 
		 * @param deviceId
		 * @param recordingDuration
		 *            in seconds
		 */
		public StartRecording(Integer deviceId, Integer recordingDuration) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
			this.recordingDuration = (recordingDuration == null) ? this.recordingDuration : recordingDuration;
		}
	}

	/**
	 * This Action will change the Manything settings so that video is captured
	 * using the rear facing camera.
	 */
	public static class UserRearFacingCamera implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public UserRearFacingCamera(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will stop your Manything camera from recording further.
	 */

	public static class StopRecording implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public StopRecording(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will turn the camera's flashlight on (if it has one).
	 */
	public static class TurnCameraFlashlightOn implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public TurnCameraFlashlightOn(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will turn the camera's flashlight off.
	 */
	public static class TurnCameraFlashlightOff implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public TurnCameraFlashlightOff(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will mute audio for recordings made on a device, so no audio
	 * is captured.
	 */
	public static class MuteAudio implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public MuteAudio(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will turn off mute audio, so that sound is captured when the
	 * device is recording.
	 */
	public static class UnmuteAudio implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public UnmuteAudio(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will switch your recording from a video stream to stills only
	 * mode, where still images are taken at regular intervals rather than
	 * video. Ideal for low bandwidth usage.
	 */
	public static class ChangeToStillsMode implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public ChangeToStillsMode(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will switch from ”Stills Only Mode” to a video stream. Note:
	 * your network bandwidth must be good enough to stream video, and the
	 * device may drop back to stills mode automatically if connection is poor.
	 */
	public static class ChangeToVideoStream implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public ChangeToVideoStream(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}

	/**
	 * This Action will sets the time interval between stills images. This value
	 * is only used when the phone is recording in stills mode.
	 */
	public static class SetTimeIntervalBetweenStills implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;
		private int timeIntervalBetweenStills;

		public Integer getDeviceId() {
			return deviceId;
		}

		/**
		 * @return timeIntervalBetweenStills in seconds
		 */
		public int gettimeIntervalBetweenStills() {
			return timeIntervalBetweenStills;
		}

		/**
		 * 
		 * @param deviceId
		 * @param timeIntervalBetweenStills
		 *            in seconds
		 */
		public SetTimeIntervalBetweenStills(Integer deviceId, int timeIntervalBetweenStills) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
			this.timeIntervalBetweenStills = timeIntervalBetweenStills;
		}
	}

	/**
	 * This Action will set the motion sensitivity on a device. "1" triggers on
	 * small motion events. "10" triggers on big motion events.
	 */
	public static class SetMotionSensitivityThreshold implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;
		private Integer motionSensitivity = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public int getMotionSensitivity() {
			return motionSensitivity;
		}

		/**
		 * @param deviceId
		 * @param motionSensitivity
		 *            "1" triggers on small motion events. "10" triggers on big
		 *            motion events.
		 */
		public SetMotionSensitivityThreshold(Integer deviceId, Integer motionSensitivity) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
			if (motionSensitivity != null && ((int) motionSensitivity < 0 || (int) motionSensitivity > 10)) {
				throw new TypeConstraintException("Must belongs to the inbetween of 0..10");
			} else {
				this.motionSensitivity = motionSensitivity;
			}
		}
	}

	/**
	 * This Action will set a number of different camera settings at the same
	 * time. You don't need to set all the settings, and can leave some as
	 * "please select", so they remain unchanged on the device. NOTE: To start a
	 * new recording, the app must be open at the recording screen on the device
	 * you specify.
	 */
	public static class SetMultipleCameraSettings implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean recording = null;
		private Boolean muteAudio = null;
		private Boolean videoOrNotStillsMode = null;
		private Integer deviceId = null;
		private Integer stillsTimeInterval = null;
		private Integer motionSensitivity = null;

		public Boolean getRecording() {
			return recording;
		}

		public Boolean getMuteAudio() {
			return muteAudio;
		}

		/**
		 * @return True if video, false if stills mode
		 */
		public Boolean getVideoOrNotStillsMode() {
			return videoOrNotStillsMode;
		}

		public Integer getDeviceId() {
			return deviceId;
		}

		/**
		 * @return in seconds
		 */
		public Integer getStillsTimeInterval() {
			return stillsTimeInterval;
		}

		public Integer getMotionSensitivity() {
			return motionSensitivity;
		}

		/**
		 * @param deviceId
		 * @param recording
		 * @param muteAudio
		 * @param videoOrNotStillsMode
		 *            True if video, false if stills mode
		 * @param stillsTimeInterval
		 *            in seconds
		 * @param motionSensitivity
		 *            "1" triggers on small motion events. "10" triggers on big
		 *            motion events.
		 */
		public SetMultipleCameraSettings(Integer deviceId, Boolean recording, Boolean muteAudio,
				Boolean videoOrNotStillsMode, Integer stillsTimeInterval, Integer motionSensitivity) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
			this.stillsTimeInterval = (stillsTimeInterval == null) ? this.stillsTimeInterval : stillsTimeInterval;
			if (motionSensitivity != null && ((int) motionSensitivity < 0 || (int) motionSensitivity > 10)) {
				throw new TypeConstraintException("Must belongs to the inbetween of 0..10");
			} else {
				this.motionSensitivity = motionSensitivity;
			}
			this.recording = (recording == null) ? this.recording : recording;
			this.muteAudio = (muteAudio == null) ? this.muteAudio : muteAudio;
			this.videoOrNotStillsMode = (videoOrNotStillsMode == null) ? this.videoOrNotStillsMode
					: videoOrNotStillsMode;
		}
	}

	/**
	 * This Trigger fires every time your Manything camera detects motion while
	 * recording. NOTE: set your camera's sensitivity threshold in the Manything
	 * app.
	 */
	public static class MotionDetected implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;
		/**
		 * !!! Not really in ifttt, just for a factory example.
		 */
		private Double quantitéDeMouvement = null;

		public MotionDetected(Double quantitéDeMouvement) {
			this.quantitéDeMouvement = quantitéDeMouvement;
		}

		public MotionDetected(Integer deviceId, Double quantitéDeMouvement) {
			this.deviceId = deviceId;
			this.quantitéDeMouvement = quantitéDeMouvement;
		}

		public Integer getDeviceId() {
			return deviceId;
		}

		public Double getQuantitéDeMouvement() {
			return this.quantitéDeMouvement;
		}
	}

	/**
	 * This Triggers when a device detects that its power has been disconnected.
	 */
	public static class PowerDisconnected implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}
	}

	/**
	 * This Trigger fires when the power is reconnected to a device.
	 */
	public static class PowerReconnected implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}
	}

	/**
	 * This Triggers when a device's battery is running low. It will trigger
	 * when there's around 20% charge remaining.
	 */
	public static class BatteryLow implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}
	}

	/**
	 * This Trigger fires when you share a clip using Manything.
	 */
	public static class ClipShared implements Serializable {
		private static final long serialVersionUID = 1L;
	}
}