package actors;

import java.util.ArrayList;
import java.util.function.Function;

import controllers.Application;
import scala.concurrent.duration.FiniteDuration;
import akka.actor.ActorRef;
import akka.actor.Cancellable;

/**
 * TODO
 * <p>
 * what about implementing real akka Scheduler?
 * </p>
 * <p>
 * Maybe we should add something to schedule trigger, but for now we only have
 * got action-message schedulers.
 * </p>
 */
public class RandomScheduler /* implements akka.actor.Scheduler */{

	private ArrayList<CancellableRef> tickingCancellables = new ArrayList<RandomScheduler.CancellableRef>();;

	/**
	 * Poor implementation. Hide errors.
	 */
	public boolean cancelAll() {
		tickingCancellables.forEach(CancellableRef::cancel);
		return true;
	}

	/**
	 * <pre>
	 * Function&lt;Void, Object&gt; z = Void -&gt; 1;
	 * z.apply(null);
	 * </pre>
	 * 
	 * <p>
	 * Once you've made a scheduler, you get a reference object of it
	 * (`CancellableRef`). Don't loose the latter as it's your only to keep in
	 * touch with the former. This design may be changed if needed. For example,
	 * you could add a name to a reference object, but you'd then loose some
	 * flexibility. Moreover, the present way it's implemented may help to
	 * better think about later cancel the scheduler.
	 * </p>
	 * 
	 * @param init
	 * @param actionActor
	 * @param actionFunction
	 *            returns a message
	 * @param randomFunction
	 *            returns each time a random number according to your need.
	 */
	public CancellableRef scheduleActionMessage(FiniteDuration init, ActorRef triggerActor, ActorRef actionActor,
			Function<Void, Object> actionFunction, Function<Void, Number> randomFunction) {

		CancellableRef cancellableRef = new CancellableRef(((MockUp) Application.getSystemProxy()).tem().scheduler()
				.scheduleOnce(init, new Runnable() {
					@Override
					public void run() {
						actionActor.tell(actionFunction.apply(null), triggerActor == null ? ActorRef.noSender()
								: triggerActor);
						scheduleActionMessage(init, actionActor, actionFunction, randomFunction);
					}
				}, ((MockUp) Application.getSystemProxy()).tem().dispatcher()));

		tickingCancellables.add(cancellableRef);
		return cancellableRef;
	}

	public CancellableRef scheduleActionMessage(FiniteDuration init, ActorRef actionActor,
			Function<Void, Object> actionFunction, Function<Void, Number> randomFunction) {
		return scheduleActionMessage(init, ActorRef.noSender(), actionActor, actionFunction, randomFunction);
	}

	/**
	 * Syntactic sugar
	 * 
	 * @param init
	 * @param actionActor
	 * @param actionMessage
	 * @param random
	 */
	public CancellableRef scheduleActionMessage(FiniteDuration init, ActorRef actionActor, Object actionMessage,
			Function<Void, Number> randomFunction) {
		return scheduleActionMessage(init, actionActor, Void -> actionMessage, randomFunction);
	}

	public class CancellableRef implements Cancellable {

		private Cancellable cancellable;

		public CancellableRef(Cancellable cancellable) {
			this.cancellable = cancellable;
		}

		@Override
		public boolean cancel() {
			try {
				return cancellable.cancel();
			} finally {
				tickingCancellables.remove(cancellable);
			}
		}

		/**
		 * Always false because erased when cancelled.
		 */
		@Override
		public boolean isCancelled() {
			return false;
		}

	}

}