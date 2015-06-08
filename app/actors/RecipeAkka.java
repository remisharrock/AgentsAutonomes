package actors;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import models.Recipe;
import akka.actor.ActorPath;

public class RecipeAkka {

	private static List<RecipeAkka> allRecipes = new ArrayList<>();

	public static List<RecipeAkka> getAllRecipes() {
		return RecipeAkka.getAllRecipes();
	}

	private long Id;

	private String title;

	private Object triggerMessage;

	/**
	 * Path to make it easy to scale over some JVM
	 */
	private ActorPath triggerPath;

	private List<String> log;

	private ActorPath actionPath;

	private Object actionMessage;

	private Recipe recipe;

	/**
	 * Group may be an attribute of actor.
	 */
	// private String group;

	public RecipeAkka() {
		log = new LinkedList<String>();
		RecipeAkka.allRecipes.add(this);
	}

	@Override
	public String toString() {
		return "Recipe [Id=" + Id + ", title=" + title + ", thisChannel=" + triggerMessage + ", thatChannel="
				+ actionPath + "]";
	}

	// Below are automatically generated methods.

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Object getTriggerMessage() {
		return triggerMessage;
	}

	public void setTriggerMessage(Object triggerMessage) {
		this.triggerMessage = triggerMessage;
	}

	public ActorPath getTriggerPath() {
		return triggerPath;
	}

	public void setTriggerPath(ActorPath triggerPath) {
		this.triggerPath = triggerPath;
	}

	public List<String> getLog() {
		return log;
	}

	public void setLog(List<String> log) {
		this.log = log;
	}

	public ActorPath getActionPath() {
		return actionPath;
	}

	public void setActionPath(ActorPath actionPath) {
		this.actionPath = actionPath;
	}

	public Object getActionMessage() {
		return actionMessage;
	}

	public void setActionMessage(Object actionMessage) {
		this.actionMessage = actionMessage;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}
}
