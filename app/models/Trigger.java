package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

@Entity
public class Trigger extends Semantic {

	public static Model.Finder<Long, Trigger> find = new Model.Finder<Long, Trigger>(Long.class, Trigger.class);

	private static final long serialVersionUID = 1L;

	public Trigger(@SuppressWarnings("rawtypes") List<Field> fields, Channel channel, String name, String description) {
		super(fields, channel, name, description);
	}
}
