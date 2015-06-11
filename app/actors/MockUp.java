package actors;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;

import models.Channel;
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.InvalidActorNameException;
import akka.actor.Props;
import akka.actor.UntypedActor;

/**
 * <p>
 * This MockUp class provides the system we're using some convenient methods to
 * access actors. It oversteps our temporary weak comprehension of the akka
 * framework by avoiding using ActorPath. Thus it comes with severe limitations:
 * we can't scale it on multiple JVMs and it may include some drawbacks.
 * However, the single JVM flaw has widely spread through this project: we never
 * use ActorPath.
 * </p>
 * 
 * <p>
 * Either real `ActorSystem system` object should be use instead, or this class
 * should only be an stateless proxy to `system` which merely reformulates
 * access to it. The class Interpretor is designed to implement this interface
 * in such a way.
 * </p>
 * 
 * <p>
 * When you get yourself free from this class, don't forget to search for use or
 * track Deprecated warnings.
 * </p>
 */
@Deprecated
public class MockUp implements SystemProxy {

	/**
	 * In the current implementation, the global object `ActorSystem system` is
	 * declared here.
	 */
	private ActorSystem system = ActorSystem.create();
	private ConcurrentHashMap<Class<? extends UntypedActor>, CopyOnWriteArrayList<ActorRef>> cheat;

	/**
	 * This method is only accessible from within actors package, by inhabitants
	 * of the world of actors. It thus enforces the MVC pattern.
	 * 
	 * @return A reference to the object `ActorSystem system`.
	 */
	ActorSystem tem() {
		return this.system;
	}

	public ActorRef createActorOf(Channel channel, String name) {
		ActorRef actorRef = null;
		int inc = 0;
		if (name == null) {
			name = channel.getClazz().getSimpleName().toLowerCase();
		}
		String givenName = name;
		do {
			try {
				actorRef = system.actorOf(Props.create(channel.getClazz()), givenName);
			} catch (InvalidActorNameException e) {
				givenName = name + inc++;
			}
		} while (actorRef == null);
		if (channel.getClazz() == null) {
			cheat.put(channel.getClazz(), new CopyOnWriteArrayList<>());
		}
		cheat.get(channel.getClazz()).add(actorRef);
		return actorRef;
	}

	@Override
	public CopyOnWriteArraySet<ActorRef> getActorsFor(Channel channel) {
		CopyOnWriteArraySet<ActorRef> set = new CopyOnWriteArraySet<>();
		cheat.get(channel.getClass()).forEach(set::add);
		return set;
	}

	/**
	 * Useful trick ;-)
	 */
	@Override
	public ActorRef getStaticActorFor(Channel channel) {
		return cheat.containsKey(channel.getClazz()) /**/
		? cheat.get(channel.getClazz()).get(0) : createActorOf(channel, null);
	}
}
