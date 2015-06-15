package world;

import java.io.Serializable;

import akka.actor.UntypedActor;

public class Bttn extends UntypedActor {

	private Integer deviceId;

	public Integer getDeviceId() {
		return this.deviceId;
	}

	public void onReceive(Object message) {
		System.out.println("No Actions available on that device");
		unhandled(message);
	}

	/**
	 * This Trigger fires every time the bttn is pressed (or not pressed within
	 * time window). Configure bttn behavior at my.bt.tn.
	 */
	public static class PressBttn implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public PressBttn(Integer deviceId) {
			this.deviceId = (deviceId == null) ? this.deviceId : deviceId;
		}
	}
}