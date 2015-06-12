package actors;

import java.time.Duration;
import java.util.function.Supplier;

import scala.concurrent.duration.FiniteDuration;
import actors.RandomScheduler.StopCriteria;
import akka.actor.Cancellable;
import controllers.Application;

public class CancellableRef implements Cancellable, Runnable {

	private Cancellable cancellable;
	private Duration init;
	private Supplier<Duration> randomFunction;
	private Runnable eventFunction;
	private StopCriteria stopCriteria;
	private boolean isCancelled;

	public CancellableRef(Duration init, Supplier<Duration> randomFunction, StopCriteria stopCriteria,
			Runnable eventFunction) {
		this.init = java.time.Duration.ofMillis(init.toMillis());
		this.randomFunction = randomFunction;
		this.stopCriteria = stopCriteria;
		this.eventFunction = eventFunction;
	}

	@Override
	public boolean cancel() {
		this.isCancelled = true;
		this.cancellable.cancel();
		return true;
	}

	/**
	 * Always false because erased when cancelled.
	 */
	@Override
	public boolean isCancelled() {
		return this.isCancelled;
	}

	@Override
	public void run() {

		try {
			Thread.sleep(init.toMillis());
		} catch (InterruptedException e) {
		}

		while (!this.isCancelled && stopCriteria.getCriteria()) {
			cancellable = ((MockUp) Application.getSystemProxy()).tem().scheduler()
					.scheduleOnce(FiniteDuration.Zero(), () -> {
						eventFunction.run();
					}, ((MockUp) Application.getSystemProxy()).tem().dispatcher());
			try {
				Thread.sleep(randomFunction.get().toMillis());
			} catch (InterruptedException e) {
			}
		}
	}
}