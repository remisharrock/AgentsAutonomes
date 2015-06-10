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
	private Semantic semantic;

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

	public Semantic getTrigger() {
		return semantic;
	}

	public void setSemantic(Trigger semantic) {
		this.semantic = semantic;
	}
}
