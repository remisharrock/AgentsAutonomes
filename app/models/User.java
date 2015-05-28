package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

import com.avaje.ebean.Ebean;

@Entity
public class User extends Model {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	private String username;
	
	private String password;
	
	private String role;
	
	private String category;
	
	@ManyToOne
	private List<Recipe> recipes;
	
	public static Model.Finder<Long, User> find = new Model.Finder<Long, User>(
			Long.class, User.class);
	
	public User(String username, String password, String role, String category) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.category = category;
	}
	
	
	
	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getRole() {
		return role;
	}



	public void setRole(String role) {
		this.role = role;
	}



	public String getCategory() {
		return category;
	}



	public void setCategory(String category) {
		this.category = category;
	}



	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}



	public static List<User> getAllUsers() {
		return Ebean.find(User.class).findList();
	}
	
	public List<Recipe> getRecipes() {
		return this.recipes;
	}
	
	@Override
	public String toString() {
		return "Username: " + this.username + " / Password: " + this.password + " / Role: " + this.role + " / Category: " + this.category;
	}
	
	public static User authenticate(String username, String password) {
		if (find.where().eq("username", username)
            .eq("password", password).findList().size() > 0) 
        return find.where().eq("username", username)
            .eq("password", password).findList().get(0);
		
		return null;
    }

}
