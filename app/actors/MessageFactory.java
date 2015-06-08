package actors;

public abstract class MessageFactory {

	/**
	 * To be improved
	 * 
	 * @param clazz
	 * @return
	 */
	public static Object getMessage(Object triggerMessage, Class<?> ActionMessageClass) {
		Object back = null;
		try {
			back = Class.forName(ActionMessageClass.getCanonicalName()).newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return back;
	}

	/**
	 * Beware of object type, it could raise cast exceptions.
	 * 
	 * @param triggerMessage
	 *            Can be of `null` type.
	 * @return actionMessage
	 */
	public abstract Object convert(Object triggerMessage);
}
