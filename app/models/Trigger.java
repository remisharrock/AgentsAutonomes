package models;

import java.util.List;

import javax.persistence.Entity;

import play.db.ebean.Model;

@Entity
public class Trigger extends Semantic {

	public static Model.Finder<Long, Trigger> find = new Model.Finder<Long, Trigger>(Long.class, Trigger.class);

	public Trigger(List<Field<?>> fields, Channel channel, String name, String description) {
		super(fields, channel, name, description);
	}

	private static final long serialVersionUID = 1L;
}
