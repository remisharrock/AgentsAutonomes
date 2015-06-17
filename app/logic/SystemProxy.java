package logic;

import java.util.List;

import models.Channel;
import akka.actor.ActorRef;

/**
 * Something easier to manage actors.
 * 
 * This shouldn't be static as the ActorSystem system itself is not.
 * 
 * Please note all arguments are from the Channel world, and all return types
 * from the actor world. This is MVC.
 */
public interface SystemProxy {

	/**
	 * We don't use Class here because we prefer AllActors.* actors to be
	 * created only by class from the actors package. This ensures MVC.
	 */
	public ActorRef createActorOf(Channel channel, String name);

	public ActorRef createActorOf(Channel channel);

	public void deleteActor(ActorRef victim);

	/**
	 * Returns a set to emphasize that similar system ActorSelection are not
	 * ordered.
	 */
	public List<ActorRef> getActorsFor(Channel channel);

	/**
	 * <p>
	 * Returns the first actor ever created for this channel and creates it if
	 * needed.
	 * </p>
	 * <p>
	 * This is cheating and very sweet syntactic sugar while this project is
	 * being developed. We ought not to use it because it's so very restrictive:
	 * for instance, what if you have two lamps?
	 * </p>
	 */
	@Deprecated
	public ActorRef getOrCreateStaticActorFor(Channel channel);

	/**
	 * Not sure this is cheating or not then, in doubt, you should think about
	 * it. I believe it legal to use it :)
	 * 
	 * @param name
	 * @return
	 */
	@Deprecated
	public ActorRef getActorByName(String name);
}
