package actors;

import java.util.ArrayList;
import java.util.function.Function;

import scala.concurrent.duration.FiniteDuration;
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
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
	/**
	 * TODO Hey, wait! shouldn't we make it final?
	 */
	private ActorSystem system;
	private ArrayList<CancellableRef> tickingCancellables;

	public RandomScheduler(ActorSystem system) {
		this.system = system;
	}

	/**
	 * Poor implementation : it masks any errors.
	 * 
	 * @return always true, that's what's poor
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
	 *            returns a message. This is used to define a message
	 *            on-the-fly. It means, the action sent can change each time
	 *            this schedule makes a tick.
	 * @param randomFunction
	 *            returns each time a random number according to your need.
	 */
	public CancellableRef scheduleActionMessage(FiniteDuration init, ActorRef triggerActor, ActorRef actionActor,
			Function<Void, Object> actionFunction, Function<Void, Number> randomFunction) {

		// A cencellable is a schedule object which alos has a button "stop".
		// Then it's useful if you want to stop it. In this implementation you
		// only can stop all random messages in a whole.
		CancellableRef cancellableRef = new CancellableRef(system.scheduler().scheduleOnce(init, new Runnable() {
			@Override
			public void run() {
				actionActor.tell(actionFunction.apply(null), triggerActor == null ? ActorRef.noSender() : triggerActor);
				scheduleActionMessage(init, actionActor, actionFunction, randomFunction);
			}
		}, system.dispatcher()));

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