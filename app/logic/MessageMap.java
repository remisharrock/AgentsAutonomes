package logic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

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
	 */
	private HashMap<Class<? extends Object>, HashMap<Class<? extends Object>, HashMap<String, T>>> container;

	public MessageMap() {
		this.container = new HashMap<Class<? extends Object>, HashMap<Class<? extends Object>, HashMap<String, T>>>();
	}

	/**
	 * Sets the default
	 */
	public void setMapper(Class<? extends Object> triggerClass, Class<? extends Object> actionClass, T mappingFunction) {
		setMapper(null, triggerClass, actionClass, mappingFunction);
	}

	/**
	 * Sets the default is unset
	 */
	public void setMapper(String name, Class<? extends Object> triggerClass, Class<? extends Object> actionClass,
			T mappingFunction) {
		if (!container.containsKey(triggerClass)) {
			container.put(triggerClass, new HashMap<Class<? extends Object>, HashMap<String, T>>());
		}
		if (!container.get(triggerClass).containsKey(actionClass)) {
			container.get(triggerClass).put(actionClass, new HashMap<String, T>());
		}
		if (name != null && !container.get(triggerClass).get(actionClass).containsKey(null)) {
			container.get(triggerClass).get(actionClass).put(null, mappingFunction);
		}
		container.get(triggerClass).get(actionClass).put(name, mappingFunction);
	}

	/**
	 * Do not get concerned by default mapper.
	 * 
	 * @param name
	 * @param triggerMessageClass
	 * @param actionMessageClass
	 * @param mappingFunction
	 */
	public UnaryOperator<Object> getMapper(Class<? extends Object> triggerMessageClass,
			Class<? extends Object> actionMessageClass) {
		return getMapper(triggerMessageClass, actionMessageClass, null);
	}

	/**
	 * TODO
	 */
	public UnaryOperator<Object> getMapper(Class<? extends Object> triggerMessageClass,
			Class<? extends Object> actionMessageClass, String name) {
		return null;
	}

	/**
	 * Bon appétit. One might find interesting to know I broke Eclipse syntax
	 * hightlighter and code formatter when writing this piece.
	 */
	public List<T> getMappersByName(String name) {
		return container.entrySet().parallelStream().flatMap(e -> e.getValue().values().parallelStream())
				.map(HashMap::entrySet).flatMap(Set::parallelStream).filter(e -> e.getKey() == name)
				.map(Map.Entry::getValue).collect(Collectors.toList());
	}

	public Object map(Object triggerMessage, Class<? extends Object> actionClass) {
		return mapWith(null, triggerMessage, actionClass);
	}

	public Object mapWith(String name, Object triggerMessage, Class<? extends Object> actionClass) {
		return null;
	}

//	// Static initializer
//	{
//		// At initialization we define some common mappings
//		Application
//				.getMessageMap()
//				.setMapper(Manythings.MotionDetected.class,
//						Lamp.ChangeState.class,
//						triggerMessage -> {
//
//							String colour = null;
//							Integer intensity = null;
//							Boolean lowConsumptionMode = null;
//							Boolean state = null;
//
//							// Don't forget to check for nullity.
//						if (triggerMessage != null && triggerMessage instanceof AllMessages.Manythings.MotionDetected) {
//							AllMessages.Manythings.MotionDetected trigger = (AllMessages.Manythings.MotionDetected) triggerMessage;
//							colour = null;
//							switch (trigger.getDeviceId()) {
//							case 1:
//								colour = "Orange";
//								break;
//							default:
//								colour = "Green";
//								break;
//							}
//							intensity = (trigger.getQuantitéDeMouvement() > 0.6) ? 10 : 4;
//							lowConsumptionMode = true;
//						}
//						AllMessages.Lamp.ChangeState message = new AllMessages.Lamp.ChangeState(state, colour,
//								intensity, lowConsumptionMode);
//						return message;
//					});
//	}
}
