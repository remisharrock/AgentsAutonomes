package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

@Entity
public class Trigger extends Model {

	private static final long serialVersionUID = 1L;

	public static Model.Finder<Long, Trigger> find = new Finder<Long, Trigger>(Long.class, Trigger.class);

	@Column
	private final Class<?> clazz;
	/**
	 * Important to be able to get it from this class because it can simplify
	 * Recipe contructor.
	 */
	@ManyToOne
	protected Channel channel;
	@SuppressWarnings("rawtypes")
	@OneToMany(mappedBy = "trigger")
	protected List<Modality> fields;

	@Id
	private long id;

	private final String description;

	private final String name;

	@OneToMany
	private List<Recipe> recipes;

	public Trigger(@SuppressWarnings("rawtypes") List<Modality> fields, Channel channel, Class<?> clazz, String name,
			String description) {
		this.fields = fields;
		this.clazz = clazz;
		this.channel = channel;
		this.description = description;
		this.name = name;
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

	public long getId() {
		return this.id;
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

	public List<Modality> getModalities() {
		return fields;
	}

	public List<Recipe> getRecipes() {
		return recipes;
	}

	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	public String getName() {
		return name;
	}

	public String getFieldName() {
		return "NYI, method added for compatibility";
	}

	@Override
	public String toString() {
		return "Trigger [id=" + id + ", name=" + name + ", description=" + description + ", channel=" + channel + "]";
	}
}
