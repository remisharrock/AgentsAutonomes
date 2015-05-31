package models;

import java.util.HashMap;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

@Entity
public class Recipe extends Model{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private long Id;
	
	private String title;
	
	private Channel triggerChannel;
	
	private Boolean active;
	
	@OneToMany
	private HashMap<Field, String> triggersMap;
	
	
	private Channel actionChannel;
	
	@OneToMany
	private HashMap<Field, String> actionsMap;
	
	@ManyToOne
	private User user;
	
	
	public Recipe(User user, String title, Channel triggerChannel,
			Channel actionChannel) {
		super();
		this.user = user;
		this.title = title;
		this.triggerChannel = triggerChannel;
		this.actionChannel = actionChannel;
	}

	
	public Recipe() {
		// TODO Auto-generated constructor stub
	}


	public static List<Recipe> getAllRecipes() {
		return Ebean.find(Recipe.class).findList();
	}
	
	
	

	public long getId() {
		return Id;
	}


	public void setId(long id) {
		Id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}


	public Channel getTriggerChannel() {
		return triggerChannel;
	}


	public void setTriggerChannel(Channel triggerChannel) {
		this.triggerChannel = triggerChannel;
	}


	public HashMap<Field, String> getTriggersMap() {
		return triggersMap;
	}


	public void setTriggersMap(HashMap<Field, String> triggersMap) {
		this.triggersMap = triggersMap;
	}


	public Channel getActionChannel() {
		return actionChannel;
	}


	public void setActionChannel(Channel actionChannel) {
		this.actionChannel = actionChannel;
	}


	public HashMap<Field, String> getActionsMap() {
		return actionsMap;
	}


	public void setActionsMap(HashMap<Field, String> actionsMap) {
		this.actionsMap = actionsMap;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	@Override
	public String toString() {
		return "Recipe [Id=" + Id + ", user=" + user + ", title=" + title
				+ ", thisChannel=" + triggerChannel + ", thatChannel="
				+ actionChannel + "]";
	}
	
	
	
}
