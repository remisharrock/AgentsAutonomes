package controllers;

import java.util.ArrayList;
import java.util.HashMap;

import actors.AllActors;
import akka.actor.ActorRef;
import akka.actor.Props;

public class SystemController {
	private static SystemController instance = null;
	public static HashMap<String, ActorRef> userGroupActorRouterMap;
	//This hashmap links an actorRouter to a user group. This actor will play the role
	//of a router for all the users belonging to this group
	
	private SystemController() {
		userGroupActorRouterMap = new HashMap<String, ActorRef>();
	}
	
	public static SystemController getSystemControllerInstance() {
		if (instance == null) {
			instance = new SystemController();
		}
		return instance;
	}
	
	public void createActorRouterMap(ArrayList<String> userGroups) {
		for (String groupName: userGroups) {
			ActorRef actor = AllActors.system.actorOf(
					Props.create(AllActors.ActorRouter.class), groupName);
			userGroupActorRouterMap.put(groupName, actor);
		}
	}

	public HashMap<String, ActorRef> getUserGroupActorRouterMap() {
		return userGroupActorRouterMap;
	}

	public void setUserGroupActorRouterMap(
			HashMap<String, ActorRef> userGroupActorRouterMap) {
		this.userGroupActorRouterMap = userGroupActorRouterMap;
	}
	
	
	
	
}
