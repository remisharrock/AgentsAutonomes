package models;

import java.util.HashMap;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import messages.AllMessages.MessageEnvelope;
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
	
	private MessageEnvelope triggerMessage; // is the message
	
	private Field triggerField;
	
	private ActorRef actionChannelActor;
	
	private MessageEnvelope actionMessage;
	
	private Field actionField;
	
	private User user;
	
	
	
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

	public MessageEnvelope getTriggerMessage() {
		return triggerMessage;
	}

	public void setTriggerMessage(MessageEnvelope triggerMessage) {
		this.triggerMessage = triggerMessage;
	}

	public ActorRef getActionChannelActor() {
		return actionChannelActor;
	}

	public void setActionChannelActor(ActorRef actionChannelActor) {
		this.actionChannelActor = actionChannelActor;
	}

	public MessageEnvelope getActionMessage() {
		return actionMessage;
	}

	public void setActionMessage(MessageEnvelope actionMessage) {
		this.actionMessage = actionMessage;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Field getTriggerField() {
		return triggerField;
	}

	public void setTriggerField(Field triggerField) {
		this.triggerField = triggerField;
	}

	public Field getActionField() {
		return actionField;
	}

	public void setActionField(Field actionField) {
		this.actionField = actionField;
	}

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
