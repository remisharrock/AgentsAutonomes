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
 * <p>
 * Actions and triggers almost perfectly have the same atributes. I've been
 * trying to make something "object-oriented" with trigger and actions but it
 * gives me a NullPointerException in the play framework. Would it be a inner
 * bug?
 * </p>
 * <p>
 * http://www.java-tips.org/java-ee-tips-100042/17-enterprise-java-beans/1959-
 * inheritance-and-the-java-persistence-api.html
 * </p>
 * <p>
 * Expected children: Trigger and Action
 * </p>
 */
@Deprecated
@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Signal extends Model {

	private static final long serialVersionUID = 1L;

	protected Class<?> clazz;
	/**
	 * Important to be able to get it from this class because it can simplify
	 * Recipe contructor.
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	protected Channel channel;
	@SuppressWarnings("rawtypes")
	@OneToMany(mappedBy = "semantic", cascade = CascadeType.ALL)
	protected List<Modality> fields;

	@Id
	protected long id;
	protected String description;

	public Signal(@SuppressWarnings("rawtypes") List<Modality> fields, Channel channel, Class<?> clazz,
			String description) {
		this.fields = fields;
		this.clazz = clazz;
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

	public Class<?> getClazz() {
		return clazz;
	}

	public void setClazz(Class<?> clazz) {
		this.clazz = clazz;
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

	public List<Modality> getFields() {
		return fields;
	}

	public void setFields(List<Modality> fields) {
		this.fields = fields;
	}
}
