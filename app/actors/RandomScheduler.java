package actors;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.function.Supplier;

import scala.concurrent.duration.FiniteDuration;

public class RandomScheduler {

	private ArrayList<CancellableRef> tickingCancellables = new ArrayList<CancellableRef>();;

	public ArrayList<CancellableRef> getTickingCancellables() {
		return this.tickingCancellables;
	}

	public boolean cancelAll() {
		tickingCancellables.forEach(CancellableRef::cancel);
		tickingCancellables.clear();
		return true;
	}

	/**
	 * 
	 * @param init
	 * @param randomFunction
	 * @param stopCriteria
	 * @param eventFunction
	 * @return
	 */
	public CancellableRef addCancellableRef(Duration init, Supplier<Duration> randomFunction,
			StopCriteria stopCriteria, Runnable eventFunction) {
		CancellableRef cr = new CancellableRef(init, randomFunction, stopCriteria, eventFunction);
		this.tickingCancellables.add(cr);
		return cr;
	}

	public CancellableRef addCancellableRef(FiniteDuration init, Supplier<Duration> randomFunction,
			StopCriteria stopCriteria, Runnable eventFunction) {
		CancellableRef cr = new CancellableRef(Duration.ofMillis(init.toMillis()), randomFunction, stopCriteria,
				eventFunction);
		this.tickingCancellables.add(cr);
		return cr;
	}

	public static enum StopCriteria {
		TIME, OCCURENCE, NEVER;
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
			case TIME:
				return LocalTime.now().isBefore((LocalTime) stopCriteria);
			}

		}
	};
}