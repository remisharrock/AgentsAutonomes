package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;



@Entity
public class Trigger extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	@Required
	private String name;
	
	private String description;
	
	//private final Class messageRef;
	
	
	@ManyToOne
	private Channel channel;
	
	@OneToOne
	private String fieldName;
	
	@OneToMany
	private List<Recipe> recipes;
	
	public static Model.Finder<Long, Trigger> find = new Model.Finder<Long, Trigger>(
			Long.class, Trigger.class);
	
//	public Trigger(String name, String description, Class messageRef) {
//		this.name = name;
//		this.description = description;
//		this.messageRef = messageRef;
//	}
	
	public Trigger(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
//	public Trigger(String name, Class messageRef) {
//		this.name = name;
//		this.messageRef = messageRef;
//	}
	
	public Trigger(String name) {
		this.name = name;
	}
	
	public long getId() {
		return this.id;
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

	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}
	
//	public Class getMessageRef(){
//		return messageRef;
//	}
	
	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public List<Recipe> getRecipes() {
		return recipes;
	}

	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	@Override
	public String toString() {
		return "Trigger [id=" + id + ", name=" + name + ", description="
				+ description + ", channel=" + channel + "]";
	}
	
	
	
	
}
