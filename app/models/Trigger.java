package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;



@Entity
public class Trigger extends Model {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	private String name;
	
	private String description;
	
	@ManyToOne
	private Channel channel;
	
	public static Model.Finder<Long, Trigger> find = new Model.Finder<Long, Trigger>(
			Long.class, Trigger.class);
	
	public Trigger(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
	public Trigger(String name) {
		this.name = name;
	}


	public String getName() {
		return name;
	}
	
	public long getId() {
		return id;
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
	
	
}
