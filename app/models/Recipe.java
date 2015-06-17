package models;

import java.util.List;

import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

public class Recipe extends Model {

	private static final long serialVersionUID = 1L;

	private final Channel triggerChannel;
	private final Trigger trigger;
	private final Channel actionChannel;
	private final Action action;
	/**
	 * Very important to be unique
	 */
	private final String name;

	private final String description;
	// @Id
	private long id;

	public static Model.Finder<Long, Recipe> find = new Model.Finder<Long, Recipe>(Long.class, Recipe.class);

	public static List<Recipe> getAllRecipes() {
		return Ebean.find(Recipe.class).findList();
	}

	@Override
	public String toString() {
		return "Recipe [Id=" + id + ", name=" + name + ", triggerChannel=" + triggerChannel + ", actionChannel="
				+ actionChannel + ", " + "]";
	}

	public Recipe(Trigger trigger, Action action, User user, String name, String description) {
		super();
		this.triggerChannel = trigger.getChannel();
		this.trigger = trigger;
		this.actionChannel = action.getChannel();
		this.action = action;
		this.name = name;
		this.description = description;
	}

	/*
	 * From here, generated methods
	 */

	public Channel getTriggerChannel() {
		return triggerChannel;
	}

	public Trigger getTrigger() {
		return trigger;
	}

	public Channel getActionChannel() {
		return actionChannel;
	}

	public Action getAction() {
		return action;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public long getId() {
		return id;
	}
}
