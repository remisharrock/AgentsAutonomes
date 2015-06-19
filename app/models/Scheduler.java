package models;

import java.util.ArrayList;
import java.util.Date;
import java.util.function.Supplier;

import play.Logger;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import actors.AllActors;
import akka.actor.ActorSystem;
import akka.actor.Cancellable;
import controllers.SystemController;

public class Scheduler {

	public static ArrayList<CancellableRef> ticks = new ArrayList<CancellableRef>();

	ActorSystem system;

	public boolean cancelAll() {
		ticks.forEach(CancellableRef::cancel);
		ticks.clear();
		return true;
	}

	public Scheduler(ActorSystem system) {
		this.system = system;
	}

	/**
	 * This allow you to do anything you want, this is called freedom.
	 * 
	 * @param init
	 * @param randomFunction
	 * @param stopCriteria
	 * @param eventRunnable
	 *            What to do when the event happen.
	 * @return
	 */
	public CancellableRef addRandomIssue(Duration init, Supplier<Duration> randomFunction, StopCriteria stopCriteria,
			Runnable eventRunnable) {
		CancellableRef cr = new CancellableRef(init, randomFunction, stopCriteria, eventRunnable);
		ticks.add(cr);
		return cr;
	}

	/**
	 * 
	 * This is much more tuned for our needs.
	 * 
	 * @param randomSupplier
	 *            The random function. Can be anything but must return a long
	 *            value each time it's invoked.
	 * @param stopCriterion
	 *            The criterion to fulfil to keep ticking.
	 * @param recipe
	 *            The recipe we want to activate periodically.
	 * @return The cancellable reference created.
	 */
	public CancellableRef periodicallyActivate(Supplier<Duration> randomSupplier, StopCriteria stopCriterion, Recipe recipe) {
		CancellableRef cr = new CancellableRef(FiniteDuration.Zero(), randomSupplier, stopCriterion, () -> {
			SystemController.userGroupActorRouterMap.get(recipe.getUser().getUserGroup()).tell(
					RecipeAkka.recipesMap.get(recipe.getId()).getTriggerMessage(),
					RecipeAkka.recipesMap.get(recipe.getId()).getTriggerChannelActor());
		});
		ticks.add(cr);
		return cr;
	}

	public CancellableRef addRandomIssue(FiniteDuration init, Supplier<Duration> randomSupplier,
			StopCriteria stopCriteria, Runnable eventRunnable) {
		CancellableRef cr = new CancellableRef(init, randomSupplier, stopCriteria, eventRunnable);
		ticks.add(cr);
		return cr;
	}

	public static enum StopCriteria {
		/**
		 * Time barrier of type java.time.LocalTime.
		 */
		DATE,
		/**
		 * Will raise the given number then get killed.
		 */
		OCCURENCE,
		/**
		 * Never stop
		 */
		NEVER;
		private Object stopCriteria;

		/**
		 * @param criteria
		 *            enum
		 * @param stopCriteria
		 *            <ul>
		 *            <li>if NEVER, can be anything</li>
		 *            <li>if OCCURENCE, must be an integer</li>
		 *            <li>If TIME, must be java.time.LocalTime</li>
		 *            </ul>
		 * @return
		 */
		public static StopCriteria set(StopCriteria criteria, Object stopCriteria) {
			criteria.stopCriteria = stopCriteria;
			return criteria;
		}

		public boolean getCriteria() {
			switch (this) {
			default:
			case NEVER:
				return true;
			case OCCURENCE:
				int occurence = ((Integer) this.stopCriteria);
				if (occurence > 0) {
					this.stopCriteria = --occurence;
					return true;
				} else
					return false;
			case DATE:
				return (new Date()).before((Date) stopCriteria);
			}

		}
	}

	public static class CancellableRef implements Cancellable, Runnable {

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
				cancellable = AllActors.system.scheduler().scheduleOnce(FiniteDuration.Zero(), () -> {
					// Logger.info("CancellableRef " + thread.getName()
					// +
					// ": eventFunction "
					// + eventFunction.toString() + " executed");
						eventFunction.run();
					}, AllActors.system.dispatcher());
				try {
					long timeInMillis = randomFunction.get().toMillis();
					// Logger.info("CancellableRef " + thread.getName() +
					// " current issue scheduled, will now wait for "
					// + (int) timeInMillis / 1000 + " seconds.");
					Thread.sleep(timeInMillis);
				} catch (InterruptedException e) {
				}
			}
			if (!stopCriteria.getCriteria()) {
				ticks.remove(this);
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
}