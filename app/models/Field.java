package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

/**
 * Can be used in multiple Trigger or Action
 * 
 * @param <T>
 */
@Entity
public class Field<T> extends Model {
	private static final long serialVersionUID = 1L;

	private T value;

	@Id
	private long id;
	private String name;
	private String description;
	@ManyToOne(cascade = CascadeType.ALL)
	private Trigger trigger;
	@ManyToOne(cascade = CascadeType.ALL)
	private Action action;

	public Field(T value, String name, String description) {
		this.value = value;
		this.name = name;
		this.description = description;
	}

	@SuppressWarnings("unused")
	private void setId(long id) {
	}

	/*
	 * From here, generated methods.
	 */

	public T getValue() {
		return value;
	}

	public void setValue(T value) {
		this.value = value;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public long getId() {
		return id;
	}

	public Trigger getTrigger() {
		return trigger;
	}

	public void setTrigger(Trigger semantic) {
		this.trigger = trigger;
	}

	public Action getAction() {
		return action;
	}

	public void setAction(Action action) {
		this.action = action;
	}
}
