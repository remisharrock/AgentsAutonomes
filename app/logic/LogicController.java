package logic;

import java.util.function.UnaryOperator;

public class LogicController {

	private static RandomScheduler randomScheduler = new RandomScheduler();
	private static SystemProxy systemProxy = new SystemProxyCheatImpl();
	private static MessageMap<UnaryOperator<Object>> messageMap = new MessageMap<>();
	private static Commutator commutator = new Commutator();

	public static RandomScheduler getScheduler() {
		return randomScheduler;
	}

	public static SystemProxy getSystemProxy() {
		return systemProxy;
	}

	public static MessageMap<UnaryOperator<Object>> getMessageMap() {
		return messageMap;
	}

	public static Commutator getCommutator() {
		return commutator;
	}
}
