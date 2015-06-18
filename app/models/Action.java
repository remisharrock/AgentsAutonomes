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
public class Action extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	@Required
	private String name;
	
	private String description;
	
	@OneToOne
	private String fieldName;
	
	@ManyToOne
	private Channel channel;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Recipe> recipes;
	
	public static Model.Finder<Long, Action> find = new Model.Finder<Long, Action>(
			Long.class, Action.class);
	
	public Action(String name, String description) {
		this.name = name;
		this.description = description;
	}

	
	public Action(String name) {
		this.name = name;
	}
	

	public long getId() {
		return id;
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
	
	
}
