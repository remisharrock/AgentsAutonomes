package logic;

import java.util.concurrent.CopyOnWriteArraySet;

import models.Channel;
import akka.actor.ActorRef;

public class SystemProxyImpl implements SystemProxy {

	@Override
	public ActorRef createActorOf(Channel channel, String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CopyOnWriteArraySet<ActorRef> getActorsFor(Channel channel) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActorRef getOrCreateStaticActorFor(Channel channel) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActorRef createActorOf(Channel channel) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActorRef getActorByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

}
