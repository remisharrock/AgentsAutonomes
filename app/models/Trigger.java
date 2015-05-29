package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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
	
	@OneToMany 
	private List<Field> fields;
	
	public static Model.Finder<Long, Trigger> find = new Model.Finder<Long, Trigger>(
			Long.class, Trigger.class);
	
	public Trigger(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
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

	public List<Field> getFields() {
		return this.fields;
	}
	
	
}
