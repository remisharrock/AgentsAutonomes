package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import play.db.ebean.Model;

@Entity
public class Field extends Model {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	private String name;
	
	private String value;
	
//	@OneToOne(mappedBy="field", cascade=CascadeType.ALL)
//	private Trigger trigger;
//	
//	@OneToOne(mappedBy="field", cascade=CascadeType.ALL)
//	private Action action;
	
	//RECIPES WHERE THE field IS FOR A TRIGGER
	@OneToMany
	private List<Recipe> triggerRecipes;
	
	//RECIPES WHERE THE field IS FOR AN ACTION
	@OneToMany
	private List<Recipe> actionRecipes;
	
	
	
	public Field(String name, String value) {
		this.name = name;
		this.value = value;
	}
	
	
	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}

//	public Trigger getTrigger() {
//		return trigger;
//	}
//
//	public void setTrigger(Trigger trigger) {
//		this.trigger = trigger;
//	}
//	
//	public Action getAction() {
//		return action;
//	}
//
//	public void setAction(Action action) {
//		this.action = action;
//	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
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


	@Override
	public String toString() {
		return "Field [name=" + name + ", value=" + value + "]";
	}


	
	
	
}
