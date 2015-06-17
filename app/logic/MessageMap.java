package logic;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import play.Logger;

/**
 * <p>
 * Used to provide few standard ways to map a message to another.
 * </p>
 * <p>
 * Should contains the most used mappings to same time, but it'll always be
 * possible to define some tweaked ones. We could define and use a functionnal
 * interface that way: Abcd<>
 * </p>
 * <p>
 * Only written on at startup, then no need for concurrent object.
 * </p>
 * <p>
 * TODO We still have to think about visibilty. Is it really mandatory to make
 * these methods public?
 * </p>
 * 
 * @param <T>
 *            most of type it'll be an object but one may be willing to create
 *            special message type.
 */
public class MessageMap<T> {

	// T = UnaryOperator<Object>

	/**
	 * Some hint: HashMap<String, UnaryOperator<Object>> is nice enough cuz it
	 * allows the null key. This value is the default between two classes.
	 * 
	 * It's not concurrent has the object set hashes the value. Moreover it's
	 * merely defined at the beginning and it's not supposed to be real time.
	 * 
	 * Name has to be unique.
	 */
	private Set<Mapper<T>> container;

	public MessageMap() {
		this.container = new HashSet<Mapper<T>>();
	}

	/**
	 * Also sets the default if unset. If name is null, the default mapper is
	 * set. If name is not null, it has to be unique. If name is not null and
	 * default mapper doesn't exist, it's also put as default one.
	 */
	public void addMapper(Class<? extends Object> triggerClass, Class<? extends Object> actionClass, T mappingFunction,
			String name) {
		Mapper mapper = new Mapper<T>(name, triggerClass, actionClass, mappingFunction);

		if (!container.stream().anyMatch(x -> x.getFrom() == triggerClass && x.getTo() == actionClass)) {
			// Then set to default.
			Mapper defaultMapper = new Mapper<T>(null, triggerClass, actionClass, mappingFunction);
			container.add(defaultMapper);
		}

		// If no other mapper has the same name
		if (!container.stream().filter(x -> x.getName() != null).anyMatch(x -> x.getName().equals(name))) {
			container.add(mapper);
		} else {
			Logger.info("grave, mapper name" + name + " already exists");
		}
	}

	public List<Mapper> getMappersFor(Class<? extends Object> triggerMessageClass,
			Class<? extends Object> actionMessageClass) {
		return container.stream().filter(w -> w.from == triggerMessageClass && w.to == actionMessageClass)
				.collect(Collectors.toList());
	}

	public Mapper<T> getMapperByName(String name) {
		Optional<Mapper<T>> optional = container.stream().filter(w -> w.name == name).findFirst();
		return optional.isPresent() ? optional.get() : null;
	}

	public Object map(Object triggerMessage, Class<? extends Object> actionClass) {
		return mapWith(null, triggerMessage, actionClass);
	}

	public Object mapWith(String name, Object triggerMessage, Class<? extends Object> actionClass) {
		return null;
	}

	// // Static initializer
	// {
	// // At initialization we define some common mappings
	// Application
	// .getMessageMap()
	// .setMapper(Manythings.MotionDetected.class,
	// Lamp.ChangeState.class,
	// triggerMessage -> {
	//
	// String colour = null;
	// Integer intensity = null;
	// Boolean lowConsumptionMode = null;
	// Boolean state = null;
	//
	// // Don't forget to check for nullity.
	// if (triggerMessage != null && triggerMessage instanceof
	// AllMessages.Manythings.MotionDetected) {
	// AllMessages.Manythings.MotionDetected trigger =
	// (AllMessages.Manythings.MotionDetected) triggerMessage;
	// colour = null;
	// switch (trigger.getDeviceId()) {
	// case 1:
	// colour = "Orange";
	// break;
	// default:
	// colour = "Green";
	// break;
	// }
	// intensity = (trigger.getQuantitéDeMouvement() > 0.6) ? 10 : 4;
	// lowConsumptionMode = true;
	// }
	// AllMessages.Lamp.ChangeState message = new
	// AllMessages.Lamp.ChangeState(state, colour,
	// intensity, lowConsumptionMode);
	// return message;
	// });
	// }

	public static class Mapper<U> {

		private final Class<?> from;
		private final Class<?> to;
		private final U mapping;
		/**
		 * Name has to be unique
		 */
		private final String name;

		/**
		 * If T is an unary functionnal interface, from and to obviously have to
		 * be the same.
		 * 
		 * @param name
		 * @param from
		 * @param to
		 * @param mapping
		 */
		public Mapper(String name, Class<?> from, Class<?> to, U mapping) {
			this.from = from;
			this.to = to;
			this.mapping = mapping;
			this.name = name;
		}

		public Class<?> getFrom() {
			return from;
		}

		public Class<?> getTo() {
			return to;
		}

		public U getMapping() {
			return mapping;
		}

		public String getName() {
			return name;
		}
	}
}
