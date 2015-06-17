package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

/**
 * Can be used in multiple Trigger or Action
 * 
 * Here we can talk about reified generics.
 * 
 * @param <T>
 *            BUG you should
 */
// @Entity
public class Modality extends Model {
	private static final long serialVersionUID = 1L;

	private Object value;

	// @Id
	private long id;
	private final String name;
	private final Class<?> clazz;
	private final String description;
	/**
	 * Entre nous soit dit c'est très dommage qu'on ne puisse pas avoir des
	 * modalités qui ne dépendent d'aucune sémantique : les modalités
	 * Température de deux sémantiques sont strictement les mêmes.
	 */
	// @ManyToOne(cascade = CascadeType.ALL)
	private Trigger trigger;
	// @ManyToOne(cascade = CascadeType.ALL)
	private Action action;

	/**
	 * 
	 * @param value
	 * @param clazz
	 *            should be primitive type
	 * @param name
	 * @param description
	 */
	public Modality(String value, Class<?> clazz, String name, String description) {
		this.value = value;
		this.name = name;
		this.clazz = clazz;
		this.description = description;
	}

	@SuppressWarnings("unused")
	private void setId(long id) {
	}

	public Object getValue() {
		return value;
	}

	public Class<?> getClazz() {
		return this.clazz;
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

	public Trigger getTrigger() {
		return trigger;
	}

	public Action getAction() {
		return action;
	}
}
