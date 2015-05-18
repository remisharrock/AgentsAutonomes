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
	public long id;
	
	public String name;
	
	public String description;
	
	@OneToMany(mappedBy="channel", cascade=CascadeType.ALL)
	public List<Trigger> triggers;
	
	public static Model.Finder<Long, Channel> find = new Model.Finder<Long, Channel>(
			Long.class, Channel.class);
	
	@OneToMany
	public List<Action> actions;
	
	public Channel(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
	public static List<Channel> getAllChannels() {
		return Ebean.find(Channel.class).findList();
	}
	
	@Override
	public String toString() {
		String s = "";
		s += "name: " + name + "\n";
		s += "description: "  + description + "\n";
		s += "triggers: ";
		for (Trigger tr : triggers) {
			s += tr.name + " ";
		}
		s += "\nactions: ";
		for (Action ac : actions) {
			s += ac.name + " ";
		}
		return s;
		
	}
	
}
