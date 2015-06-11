package models;

import java.util.HashMap;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import play.db.ebean.Model;
import akka.actor.ActorRef;


public class RecipeAkka {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static HashMap<Long, RecipeAkka> recipesMap;
	
	private long Id;
	
	private String title;
	
	private Boolean active;
	
	private ActorRef triggerChannelActor; // will be of type ActorRef
	
	private Object triggerMessage; // is the message
	
	private ActorRef actionChannelActor;
	
	private Object actionMessage;
	
	private User user;
	
//	private Recipe recipe;
	
	
	public RecipeAkka() {
		
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public ActorRef getTriggerChannelActor() {
		return triggerChannelActor;
	}

	public void setTriggerChannelActor(ActorRef triggerChannelActor) {
		this.triggerChannelActor = triggerChannelActor;
	}

	public Object getTriggerMessage() {
		return triggerMessage;
	}

	public void setTriggerMessage(Object triggerMessage) {
		this.triggerMessage = triggerMessage;
	}

	public ActorRef getActionChannelActor() {
		return actionChannelActor;
	}

	public void setActionChannelActor(ActorRef actionChannelActor) {
		this.actionChannelActor = actionChannelActor;
	}

	public Object getActionMessage() {
		return actionMessage;
	}

	public void setActionMessage(Object actionMessage) {
		this.actionMessage = actionMessage;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

//	public Recipe getRecipe() {
//		return recipe;
//	}
//
//	public void setRecipe(Recipe recipe) {
//		this.recipe = recipe;
//	}

	public long getId() {
		return Id;
	}

	@Override
	public String toString() {
		return "RecipeAkka [Id=" + Id + ", title=" + title + ", active="
				+ active + ", triggerChannelActor=" + triggerChannelActor
				+ ", triggerMessage=" + triggerMessage
				+ ", actionChannelActor=" + actionChannelActor
				+ ", actionMessage=" + actionMessage + ", user=" + user + "]";
	}
	
	
	
	
}
