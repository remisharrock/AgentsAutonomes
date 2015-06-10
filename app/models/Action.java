package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

@Entity
public class Action extends Model {

	public static Model.Finder<Long, Action> find = new Model.Finder<Long, Action>(Long.class, Action.class);

	protected String name;
	@ManyToOne(cascade = CascadeType.ALL)
	private Channel channel;
	@SuppressWarnings("rawtypes")
	@OneToMany(mappedBy = "action", cascade=CascadeType.ALL)
	private List<Field> fields;

	@Id
	private long id;
	private String description;
	private static final long serialVersionUID = 1L;

	public Action(@SuppressWarnings("rawtypes") List<Field> fields, Channel channel, String name, String description) {
		this.fields = fields;
		this.name = name;
		this.channel = channel;
		this.description = description;
	}

	@SuppressWarnings("rawtypes")
	public List<Field> getFields() {
		return fields;
	}

	public void setFields(@SuppressWarnings("rawtypes") List<Field> fields) {
		this.fields = fields;
	}

	/*
	 * From here, generated methods
	 */

	public static Model.Finder<Long, Action> getFind() {
		return find;
	}

	public static void setFind(Model.Finder<Long, Action> find) {
		Action.find = find;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
}
