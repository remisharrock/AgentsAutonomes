package world;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import play.Logger;
import akka.actor.UntypedActor;

public class Lamp extends UntypedActor {
	private Boolean state = null;
	private String colour = null;
	private Integer intensity = null;
	private Boolean lowConsumptionMode = null;

	public void Lamp() {
	}

	public void Lamp(Boolean state, String colour, Integer intensity, Boolean lowConsumptionMode) {
		this.state = state;
		this.colour = colour;
		this.intensity = intensity;
		this.lowConsumptionMode = lowConsumptionMode;
	}

	public void onReceive(Object message) {
		if (message instanceof world.Lamp.ChangeState) {
			world.Lamp.ChangeState action = (world.Lamp.ChangeState) message;
			try {
				Logger.info("Lamp " + URLDecoder.decode(getSelf().path().name(), "UTF-8") + " received message "
						+ action.toString() + "with state is now {colour=" + action.getColour() + ", intensity="
						+ action.getIntensity() + ", low=" + action.getLowConsumptionMode() + ", state="
						+ action.getState() + "}");
			} catch (UnsupportedEncodingException e1) {
			}
			this.colour = (action.getColour() == null) ? this.colour : action.getColour();
			this.intensity = (action.getIntensity() == null) ? this.intensity : action.getIntensity();
			this.lowConsumptionMode = (action.getLowConsumptionMode() == null) ? this.lowConsumptionMode : action
					.getLowConsumptionMode();
			this.state = (action.getState() == null) ? this.state : action.getState();
			try {
				Logger.info("Lamp " + URLDecoder.decode(getSelf().path().name(), "UTF-8") + " state is now: {colour="
						+ this.colour + ", intensity=" + this.intensity + ", low=" + this.lowConsumptionMode
						+ ", state=" + this.state + "}");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else
			unhandled(message);
	}

	public static class ChangeState implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean state = null;
		private String colour = null;
		private Integer intensity = null;
		private Boolean lowConsumptionMode = null;

		public ChangeState(Boolean state, String colour, Integer intensity, Boolean lowConsumptionMode) {
			this.colour = colour;
			this.intensity = intensity;
			this.lowConsumptionMode = lowConsumptionMode;
			this.state = state;
		}

		public Boolean getState() {
			return this.state;
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
	}

}