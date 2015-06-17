package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;
import akka.actor.UntypedActor;

import com.avaje.ebean.Ebean;

/**
 * Model is an abstraction of Actor. Because it takes a class reference, one
 * could have subtypes of this class. By the way, the best abstraction would be
 * to link a model to an interface which some actors would implements. It would
 * allow something like multiple inheritance. As an actor would implements
 * several interfaces, it could be sent different messages. The main issue with
 * this idea is an actor only receive message by onReceive() and the message
 * sending protocol doesn't imply any other method.
 */
@Entity
public class Channel extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	@Required
	private String name;

	private String description;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Trigger> triggers;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Action> actions;

	// RECIPES WHERE THE CHANNEL IS A TRIGGER
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "triggerChannel")
	private List<Recipe> triggerRecipes;

	// RECIPES WHERE THE CHANNEL IS AN ACTION
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "actionChannel")
	private List<Recipe> actionRecipes;

	public static Model.Finder<Long, Channel> find = new Model.Finder<Long, Channel>(Long.class, Channel.class);

	public static List<Channel> getAllChannels() {
		return Ebean.find(Channel.class).findList();
	}

	/**
	 * Actor class. This allows a recipe to be an abstraction
	 */
	private Class<? extends UntypedActor> clazz;

	@Override
	public String toString() {
		return "Channel [id=" + id + ", name=" + clazz.getSimpleName() + ", description=" + description + ", triggers="
				+ triggers + ", actions=" + actions + "]";
	}

	public Channel(List<Trigger> triggers, List<Action> actions, Class<? extends UntypedActor> clazz, String description) {
		this.triggers = triggers;
		this.actions = actions;
		this.clazz = clazz;
		this.description = description;
	}

	/*
	 * Below, automatically generated methods.
	 */

	public String getName() {
		return name;
	}

	public long getId() {
		return id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Trigger> getTriggers() {
		return triggers;
	}

	public void setTriggers(List<Trigger> triggers) {
		this.triggers = triggers;
	}

	public List<Action> getActions() {
		return actions;
	}

	public void setActions(List<Action> actions) {
		this.actions = actions;
	}

	public List<Recipe> getTriggerRecipes() {
		return triggerRecipes;
	}

	public void setTriggerRecipes(List<Recipe> triggerRecipes) {
		this.triggerRecipes = triggerRecipes;
	}

	public List<Recipe> getActionRecipes() {
		return actionRecipes;
	}

	public void setActionRecipes(List<Recipe> actionRecipes) {
		this.actionRecipes = actionRecipes;
	}

	public Class<? extends UntypedActor> getClazz() {
		return clazz;
	}

	public void setClazz(Class<? extends UntypedActor> clazz) {
		this.clazz = clazz;
	}
}
