package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

@Entity
public class Action extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	public long id;
	
	public String name;
	
	public String description;
	
	@ManyToOne
	public Channel channel;
	
	public static Model.Finder<Long, Action> find = new Model.Finder<Long, Action>(
			Long.class, Action.class);
	
	public Action(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
	public Action(String name) {
		this.name = name;
	}
}
