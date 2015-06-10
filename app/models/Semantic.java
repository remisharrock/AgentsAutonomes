package models;

import java.util.List;

import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

public abstract class Semantic extends Model {

	@OneToMany
	protected List<Field<?>> fields;
	protected String name;
	/**
	 * Important to be able to get it from this class because it can simplify
	 * Recipe contructor.
	 */
	@ManyToOne
	private Channel channel;

	@Id
	private long id;
	private String description;
	private static final long serialVersionUID = 1L;

	public Semantic(List<Field<?>> fields, Channel channel, String name, String description) {
		this.fields = fields;
		this.name = name;
		this.channel = channel;
		this.description = description;
	}

	/**
	 * id should be final, but if so the constructor should set it. This trick
	 * avoids it.
	 * 
	 * @param id
	 */
	@SuppressWarnings("unused")
	private void setId(long id) {
	}

	/*
	 * Below, generated methods.
	 */

	public List<Field<?>> getFields() {
		return fields;
	}

	public void setFields(List<Field<?>> fields) {
		this.fields = fields;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getId() {
		return id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
