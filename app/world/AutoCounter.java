package world;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.function.Supplier;

import logic.RandomScheduler;
import logic.RandomScheduler.StopCriteria;
import play.Logger;
import scala.concurrent.duration.Duration;
import world.AutoCounter.NewStepPassedThrough;
import akka.actor.UntypedActor;
import controllers.Application;

/**
 * This demonstrates how an actor can talk to the ones of its kind, including
 * itself the medium. This can be useful to implement some consensus algorithm
 * like Paxos. One could object the method getSelf() would suffice and would be
 * true, but this method references emitter and receiver directly and thus
 * by-passes other causal relations.
 * 
 * However, as stated by akka documentation, getSelf() should always be used to
 * refer to the actor itself.
 * 
 * Attributes of messages are final to emphasize they can't be change once
 * message has been defined.
 */
public class AutoCounter extends UntypedActor {

	private RandomScheduler innerRandomScheduler;
	private int currentSeed;

	public void onReceive(Object message) {
		if (message instanceof NewStepPassedThrough) {
			NewStepPassedThrough castedMessage = (NewStepPassedThrough) message;
			try {
				Logger.info("actor " + URLDecoder.decode(getSelf().path().name(), "UTF-8")
						+ " has received nextStep message with current value " + castedMessage.getStep());
			} catch (UnsupportedEncodingException e) {
			}
		} else if (message instanceof RandomCountDown) {
			RandomCountDown castedMessage = (RandomCountDown) message;
			innerRandomScheduler.addRandomIssue(Duration.Zero(), castedMessage.periodSupplier,
					StopCriteria.set(StopCriteria.OCCURENCE, castedMessage.seed), () -> {
						currentSeed--;
						Application.getCommutator().emitTriggerMessage(//
								getSelf(),//
								NewStepPassedThrough.class,//
								() -> new NewStepPassedThrough(currentSeed));
					});
		} else {
			unhandled(message);
		}
	}

	public static class NewStepPassedThrough implements Serializable {
		private static final long serialVersionUID = 1L;
		private final int step;

		public NewStepPassedThrough(int step) {
			this.step = step;
		}

		public int getStep() {
			return step;
		}
	}

	public static class RandomCountDown implements Serializable {
		private static final long serialVersionUID = 1L;
		private final int seed;
		private final Supplier<Duration> periodSupplier;

		public RandomCountDown(int seed, Supplier<Duration> periodSupplier) {
			this.seed = seed;
			this.periodSupplier = periodSupplier;
		}

		public int getSeed() {
			return seed;
		}

		public Supplier<Duration> getPeriodSupplier() {
			return periodSupplier;
		}
	}
}