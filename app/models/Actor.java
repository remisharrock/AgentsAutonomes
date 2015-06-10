package models;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Just a mock-up class to let the database remember which actors have to be
 * created.
 */
@Entity
public class Actor {
	@Id
	private final String clazz;
	/**
	 * The name of the actor. Both clazz and name make the key
	 */
	@Id
	private final String name;

	public Actor(String clazz, String name) {
		this.clazz = clazz;
		this.name = name;
	}

	public String getClazz() {
		return clazz;
	}

	public String getName() {
		return name;
	}
}
