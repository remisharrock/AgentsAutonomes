package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

@Entity
public class Channel extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	private String name;
	
	private String description;
	
	@OneToMany(mappedBy="channel", cascade=CascadeType.ALL)
	private List<Trigger> triggers;
	
	public static Model.Finder<Long, Channel> find = new Model.Finder<Long, Channel>(
			Long.class, Channel.class);
	
	@OneToMany
	private List<Action> actions;
	
	public Channel(String name, String description) {
		this.name = name;
		this.description = description;
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

	@Override
	public String toString() {
		return "Channel [id=" + id + ", name=" + name + ", description="
				+ description + ", triggers=" + triggers + ", actions="
				+ actions + "]";
	}
	
}
