package logic;

import scala.concurrent.duration.Duration;
import java.util.function.Supplier;

import logic.RandomScheduler.StopCriteria;
import play.Logger;
import scala.concurrent.duration.FiniteDuration;
import akka.actor.Cancellable;
import controllers.Application;

public class CancellableRef implements Cancellable, Runnable {

	private Cancellable cancellable;
	private final Duration init;
	private final Supplier<Duration> randomFunction;
	private final Runnable eventFunction;
	private final StopCriteria stopCriteria;
	private boolean isCancelled;
	private final Thread thread;

	public CancellableRef(Duration init, Supplier<Duration> randomFunction, StopCriteria stopCriteria,
			Runnable eventFunction) {
		this.init = init;
		this.randomFunction = randomFunction;
		this.stopCriteria = stopCriteria;
		this.eventFunction = eventFunction;
		thread = new Thread(this);
		thread.setName("CancellableRef " + this.toString());
		Logger.info("CancellableRef thread " + thread.getName() + " created.");
		thread.start();
	}

	@Override
	public boolean cancel() {
		Logger.info("CancellableRef thread " + thread.getName() + " cancelled.");
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

	@SuppressWarnings("unused")
	private void setCancellable(Cancellable cancellable) {
	}

	@SuppressWarnings("unused")
	private void setCancelled(boolean isCancelled) {
	}

	/*
	 * Below, generated methods.
	 */

	@Override
	public void run() {

		try {
			Thread.sleep(init.toMillis());
		} catch (InterruptedException e) {
		}

		while (!this.isCancelled && stopCriteria.getCriteria()) {
			cancellable = ((SystemProxyCheatImpl) Application.getSystemProxy())
					.tem()
					.scheduler()
					.scheduleOnce(
							FiniteDuration.Zero(),
							() -> {
								Logger.info("CancellableRef " + thread.getName() + ": eventFunction "
										+ eventFunction.toString() + " executed");
								eventFunction.run();
							}, ((SystemProxyCheatImpl) Application.getSystemProxy()).tem().dispatcher());
			try {
				long timeInMillis = randomFunction.get().toMillis();
				Logger.info("CancellableRef " + thread.getName() + " current issue scheduled, will now wait for "
						+ (int) timeInMillis / 1000 + " seconds.");
				Thread.sleep(timeInMillis);
			} catch (InterruptedException e) {
			}
		}
		if (!stopCriteria.getCriteria()) {
			Logger.info("CancellableRef " + thread.getName()
					+ " will now stop but wil remain in RandomScheduler thus won't be garbage collected.");
		}
	}

	public Cancellable getCancellable() {
		return cancellable;
	}

	public Duration getInit() {
		return init;
	}

	public Supplier<Duration> getRandomFunction() {
		return randomFunction;
	}

	public Runnable getEventFunction() {
		return eventFunction;
	}

	public StopCriteria getStopCriteria() {
		return stopCriteria;
	}

	public Thread getThread() {
		return thread;
	}
}