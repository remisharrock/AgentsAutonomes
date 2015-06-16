package world;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import scala.concurrent.duration.Duration;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Supplier;

import logic.CancellableRef;
import logic.RandomScheduler;
import logic.RandomScheduler.StopCriteria;
import play.Logger;
import akka.actor.UntypedActor;

public class PresenceDetector extends UntypedActor {

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
	public CancellableRef scheduleTrigger(Duration init, Supplier<Duration> randomFunction, StopCriteria stopCriteria,
			Runnable eventFunction) {
		return innerRandomScheduler.addRandomIssue(init, randomFunction, stopCriteria, eventFunction);
	}

	public static class TurnState implements Serializable {
		private static final long serialVersionUID = 1L;
		private boolean state;

		public TurnState(boolean state) {
			this.state = state;
		}

		public Boolean getChangeState() {
			return state;
		}
	}

	public static class MotionDetected implements Serializable {
		private static final long serialVersionUID = 1L;
		private Integer deviceId = null;

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
}