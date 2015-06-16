package models;

import javax.persistence.Entity;

import akka.actor.UntypedActor;
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
@Entity
public class Actor extends Model {
	/**
	 * Must be unique in the local database.
	 */
	private String actorName;
	/**
	 * Class of the actor.
	 */
	public Class<? extends UntypedActor> clazz;
}
