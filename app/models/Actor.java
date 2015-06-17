package models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

/**
 * This is a Model class which is to be saved into the DB, it merely stands for
 * remembering registered actors.
 * 
 * Note that a saved actor will be created in an default state. Depending on the
 * way you've defined your actor classes, this state may be inconsistent.
 * 
 * TODO Implementation to be finished
 */
//@Entity
public class Actor extends Model {
	/**
	 * Must be unique in the local database.
	 */
	private final String actorName;
//	@ManyToOne(cascade = CascadeType.ALL)
	private final Channel channel;
	private final User user;

	public final static Model.Finder<Long, Actor> find = new Model.Finder<Long, Actor>(Long.class, Actor.class);

	public Actor(String actorName, Channel channel, User user) {
		this.actorName = actorName;
		this.channel = channel;
		this.user = user;
	}

	public String getActorName() {
		return actorName;
	}

	public Channel getChannel() {
		return channel;
	}

	public User getUser() {
		return user;
	}

	public static Model.Finder<Long, Actor> getFind() {
		return find;
	}
}
