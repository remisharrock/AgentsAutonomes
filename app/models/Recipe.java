package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

@Entity
public class Recipe extends Model{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private long Id;
	
	private User user;
	
	private String title;
	
	private Channel thisChannel;
	
	private Channel thatChannel;
	
	
	public Recipe(User user, String title, Channel thisChannel,
			Channel thatChannel) {
		super();
		this.user = user;
		this.title = title;
		this.thisChannel = thisChannel;
		this.thatChannel = thatChannel;
	}

	
	public static List<Recipe> getAllRecipes() {
		return Ebean.find(Recipe.class).findList();
	}


	@Override
	public String toString() {
		return "Recipe [Id=" + Id + ", user=" + user + ", title=" + title
				+ ", thisChannel=" + thisChannel + ", thatChannel="
				+ thatChannel + "]";
	}
	
	
	
}
