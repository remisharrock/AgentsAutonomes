package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;



@Entity
public class Trigger extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	public long id;
	
	public String name;
	
	public String description;
	
	@ManyToOne
	public Channel channel;
	
	public static Model.Finder<Long, Trigger> find = new Model.Finder<Long, Trigger>(
			Long.class, Trigger.class);
	
	public Trigger(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
	public Trigger(String name) {
		this.name = name;
	}
}
