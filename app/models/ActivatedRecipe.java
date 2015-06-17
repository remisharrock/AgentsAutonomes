package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

public class ActivatedRecipe extends Model {

	private static final long serialVersionUID = 1L;
	private final Recipe recipe;
	private final Actor triggerActor;
	private final Actor actionActor;

	public ActivatedRecipe(Recipe recipe, Actor triggerActor, Actor actionActor) {
		this.recipe = recipe;
		this.triggerActor = triggerActor;
		this.actionActor = actionActor;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public Actor getTriggerActor() {
		return triggerActor;
	}

	public Actor getActionActor() {
		return actionActor;
	}

}
