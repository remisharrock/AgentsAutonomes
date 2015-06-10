package models;

import java.util.List;

import javax.persistence.Entity;

import play.db.ebean.Model;

@Entity
public class Action extends Semantic {

	private static final long serialVersionUID = 1L;

	public static Model.Finder<Long, Action> find = new Model.Finder<Long, Action>(Long.class, Action.class);

	public Action(List<Field<?>> fields, Channel channel, String name, String description) {
		super(fields, channel, description, description);
	}

}
