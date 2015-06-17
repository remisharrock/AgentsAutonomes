package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.db.ebean.Model;

@Entity
public class BindedRecipe extends Model {

	private static final long serialVersionUID = 1L;
	private final Recipe recipe;
	private final Actor triggerActor;
	private final Actor actionActor;
	private final User user;
	private List<Log> log;
	@Id
	private long id;

	public BindedRecipe(Recipe recipe, Actor triggerActor, Actor actionActor, User user) {
		this.recipe = recipe;
		this.triggerActor = triggerActor;
		this.actionActor = actionActor;
		this.user = user;
		this.log = new ArrayList<Log>();
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public List<Log> getLog() {
		return log;
	}

	@Deprecated
	public List<Log> getLogReverseOrder() {
		return log;
	}

	/**
	 * From my limited knownledge, a bindedRecipe is active by definition.
	 * 
	 * @return
	 */
	public boolean getActive() {
		return true;
	}

	public Actor getTriggerActor() {
		return triggerActor;
	}

	public Actor getActionActor() {
		return actionActor;
	}

	public User getUser() {
		return this.user;
	}

	public long getId() {
		return this.id;
	}
}
