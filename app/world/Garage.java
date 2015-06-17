package world;

import java.io.Serializable;

import akka.actor.UntypedActor;

public class Garage extends UntypedActor {

	private Integer doorId = null;
	public boolean state;

	public Integer getDoorId() {
		return this.doorId;
	}

	public void onReceive(Object message) {
		if (message instanceof Open) {
		} else if (message instanceof Close) {
		} else {
			unhandled(message);
		}
	}

	/**
	 * This Action will open the garage door you specify. If the garage door is
	 * already open, the door will remain open.
	 */
	public static class Open implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer doorId = null;

		public Integer getDeviceId() {
			return doorId;
		}

		public Open(Integer doorId) {
			this.doorId = (doorId == null) ? this.doorId : doorId;
		}
	}

	/**
	 * This Action will close the garage door you specify. If the garage door is
	 * already closed, the door will remain closed.
	 */
	public static class Close implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer doorId = null;

		public Integer getDeviceId() {
			return doorId;
		}

		public Close(Integer doorId) {
			this.doorId = (doorId == null) ? this.doorId : doorId;
		}
	}

	/**
	 * This Trigger fires every time a garage door you manage is opened or
	 * closed via the Garageio website or smartphone app.
	 */
	public static class DoorOpenedOrClose implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

		public Integer getDeviceId() {
			return deviceId;
		}

		public DoorOpenedOrClose(Integer doorId) {
			this.deviceId = (doorId == null) ? this.deviceId : doorId;
		}
	}
}