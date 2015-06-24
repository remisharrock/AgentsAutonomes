package main;

import java.util.ArrayList;
import java.util.Date;

import controllers.SystemController;
import models.Recipe;
import models.RecipeAkka;
import play.Logger;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import actors.AllActors;
import akka.actor.ActorSystem;
import akka.actor.Cancellable;

public class Scheduler {

	public static ArrayList<CancellableRef> ticks = new ArrayList<CancellableRef>();

	ActorSystem system;

	public boolean cancelAll() {
		for (CancellableRef c : ticks) {
			c.cancel();
		}
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
	 * @param randomPeriodFactory
	 * @param stopCriteria
	 * @param eventRunnable
	 *            What to do when the event happen.
	 * @return
	 */
	public CancellableRef addRandomIssue(Duration init, RandomPeriodStrategy randomPeriodFactory,
			StopCriteria stopCriteria, Runnable eventRunnable) {
		CancellableRef cr = new CancellableRef(init, randomPeriodFactory, stopCriteria, eventRunnable);
		ticks.add(cr);
		return cr;
	}

	/**
	 * 
	 * This is much more tuned for our needs.
	 * 
	 * @param randomPeriodFactory
	 *            The random function. Can be anything but must return a long
	 *            value each time it's invoked.
	 * @param stopCriterion
	 *            The criterion to fulfil to keep ticking.
	 * @param recipe
	 *            The recipe we want to activate periodically.
	 * @return The cancellable reference created.
	 */
	public CancellableRef periodicallyActivate(RandomPeriodStrategy randomPeriodFactory, StopCriteria stopCriterion,
			final Recipe recipe) {
		CancellableRef cr = new CancellableRef(FiniteDuration.Zero(), randomPeriodFactory, stopCriterion,
				new Runnable() {
					@Override
					public void run() {
						SystemController.userGroupActorRouterMap.get(recipe.getUser().getUserGroup()).tell(
								RecipeAkka.recipesMap.get(recipe.getId()).getTriggerMessage(),
								RecipeAkka.recipesMap.get(recipe.getId()).getTriggerChannelActor());
					}
				});
		ticks.add(cr);
		return cr;
	}

	public CancellableRef addRandomIssue(FiniteDuration init, RandomPeriodStrategy randomPeriodFactory,
			StopCriteria stopCriteria, Runnable eventRunnable) {
		CancellableRef cr = new CancellableRef(init, randomPeriodFactory, stopCriteria, eventRunnable);
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
		 *            <li>If DATE, must be Date</li>
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

	public static interface RandomPeriodStrategy {
		/**
		 * Each time it's called, return a new different period. The random law
		 * is defined in the bodybut you're likely to get some help from
		 * StdRandom.
		 * 
		 * @return
		 */
		public scala.concurrent.duration.Duration getPeriod();
	}

	public static class CancellableRef implements Cancellable, Runnable {

		private Cancellable cancellable;
		private final Duration init;
		private final RandomPeriodStrategy randomPeriodFactory;
		private final Runnable eventFunction;
		private final StopCriteria stopCriteria;
		private boolean isCancelled;
		private final Thread thread;

		public CancellableRef(Duration init, RandomPeriodStrategy randomPeriodFactory, StopCriteria stopCriteria,
				Runnable eventFunction) {
			this.init = init;
			this.randomPeriodFactory = randomPeriodFactory;
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
			if (this.cancellable != null) {
				this.cancellable.cancel();
			}
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
				cancellable = AllActors.system.scheduler().scheduleOnce(FiniteDuration.Zero(), new Runnable() {
					@Override
					public void run() {
						// Logger.info("CancellableRef " + thread.getName()
						// +
						// ": eventFunction "
						// + eventFunction.toString() + " executed");
						eventFunction.run();
					}
				}, AllActors.system.dispatcher());
				try {
					long timeInMillis = randomPeriodFactory.getPeriod().toMillis();
					// Logger.info("CancellableRef " + thread.getName() +
					// " current issue scheduled, will now wait for "
					// + (int) timeInMillis / 1000 + " seconds.");
					Thread.sleep(timeInMillis);
				} catch (InterruptedException e) {
				}
			}
			ticks.remove(this);
		}

		public Cancellable getCancellable() {
			return cancellable;
		}

		public Duration getInit() {
			return init;
		}

		public RandomPeriodStrategy getRandomPeriodFactory() {
			return randomPeriodFactory;
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