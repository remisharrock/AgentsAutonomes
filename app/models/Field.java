package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

@Entity
public class Field extends Model {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	private String name;
	
	private String description;
	
	@ManyToOne
	private Trigger trigger;
	
	@ManyToOne
	private Action action;
	
	
	public Field(String name, String description) {
		this.name = name;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Trigger getTrigger() {
		return trigger;
	}

	public void setTrigger(Trigger trigger) {
		this.trigger = trigger;
	}
	
	public Action getAction() {
		return action;
	}

	public void setAction(Action action) {
		this.action = action;
	}
	
	
}
