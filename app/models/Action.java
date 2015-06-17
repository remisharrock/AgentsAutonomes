package models;

import java.util.List;

import javax.persistence.Id;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

//@Entity
public class Action extends Model {

	private static final long serialVersionUID = 1L;

	public static Model.Finder<Long, Trigger> find = new Finder<Long, Trigger>(Long.class, Trigger.class);

	private final Class<?> clazz;
	/**
	 * Important to be able to get it from this class because it can simplify
	 * Recipe contructor.
	 */
	// @ManyToOne(cascade = CascadeType.ALL)
	protected Channel channel;
	// @SuppressWarnings("rawtypes")
	// @OneToMany(mappedBy = "trigger", cascade = CascadeType.ALL)
	protected List<Modality> fields;

	@Id
	private long id;

	private final String description;

	private final String name;

	// private final Class messageRef;

	@OneToMany
	private List<Recipe> recipes;

	// public Trigger(String name, String description, Class messageRef) {
	// this.name = name;
	// this.description = description;
	// this.messageRef = messageRef;
	// }

	public Action(@SuppressWarnings("rawtypes") List<Modality> fields, Channel channel, Class<?> clazz, String name,
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

	public String getFieldName() {
		return "NYI, method added for compatibility";
	}

	public String getName() {
		return this.name;
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

	public long getId() {
		return this.id;
	}

	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	@Override
	public String toString() {
		return "Trigger [id=" + id + ", name=" + name + ", description=" + description + ", channel=" + channel + "]";
	}
}
