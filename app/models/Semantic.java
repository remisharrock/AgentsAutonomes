package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

/**
 * I've been trying to make something "object-oriented" with trigger and actions
 * but it gives me a NullPointerException in the play framework. Would it be a
 * inner bug?
 */
@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Semantic extends Model {

	private static final long serialVersionUID = 1L;

	protected String name;
	/**
	 * Important to be able to get it from this class because it can simplify
	 * Recipe contructor.
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	protected Channel channel;
	@SuppressWarnings("rawtypes")
	@OneToMany(mappedBy = "semantic", cascade = CascadeType.ALL)
	protected List<Field> fields;

	@Id
	protected long id;
	protected String description;

	public Semantic(@SuppressWarnings("rawtypes") List<Field> fields, Channel channel, String name, String description) {
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

	public List<Field> getFields() {
		return fields;
	}

	public void setFields(List<Field> fields) {
		this.fields = fields;
	}
}
