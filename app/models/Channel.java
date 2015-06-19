package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

@Entity
public class Channel extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	@Required
	private String name;
	
	private String description;
	
	private String logo;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Trigger> triggers;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Action> actions;
	
	//RECIPES WHERE THE CHANNEL IS A TRIGGER
	@OneToMany(cascade = CascadeType.ALL, mappedBy="triggerChannel")
	private List<Recipe> triggerRecipes;
	
	//RECIPES WHERE THE CHANNEL IS AN ACTION
	@OneToMany(cascade = CascadeType.ALL, mappedBy="actionChannel")
	private List<Recipe> actionRecipes;
	
	public static Model.Finder<Long, Channel> find = new Model.Finder<Long, Channel>(
			Long.class, Channel.class);
	
	public Channel(String name, String description) {
		this.name = name;
		this.description = description;
		triggerRecipes = new ArrayList<Recipe>();
		actionRecipes = new ArrayList<Recipe>();
	}
	
	public Channel() {
		triggerRecipes = new ArrayList<Recipe>();
		actionRecipes = new ArrayList<Recipe>();
	}
	
	public static List<Channel> getAllChannels() {
		return Ebean.find(Channel.class).findList();
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
	
	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public List<Trigger> getTriggers() {
		return triggers;
	}

	public void setTriggers(List<Trigger> triggers) {
		this.triggers = triggers;
	}

	public List<Action> getActions() {
		return actions;
	}

	public void setActions(List<Action> actions) {
		this.actions = actions;
	}
	
	public List<Recipe> getTriggerRecipes() {
		return triggerRecipes;
	}

	public void setTriggerRecipes(List<Recipe> triggerRecipes) {
		this.triggerRecipes = triggerRecipes;
	}

	public List<Recipe> getActionRecipes() {
		return actionRecipes;
	}

	public void setActionRecipes(List<Recipe> actionRecipes) {
		this.actionRecipes = actionRecipes;
	}

	public Channel getChannelFromId(long id){
		return Ebean.find(Channel.class, id);
	}
	

	@Override
	public String toString() {
		return "Channel [id=" + id + ", name=" + name + ", description="
				+ description + ", triggers=" + triggers + ", actions="
				+ actions + "]";
	}
	
}
