package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;

import com.avaje.ebean.Ebean;

import play.db.ebean.Model;

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
	
	public static Model.Finder<Long, User> find = new Model.Finder<Long, User>(
			Long.class, User.class);
	
	public User(String username, String password, String role, String category) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.category = category;
	}
	
	public static List<User> getAllUsers() {
		return Ebean.find(User.class).findList();
	}
	
	@Override
	public String toString() {
		return "Username: " + this.username + " / Password: " + this.password + " / Role: " + this.role + " / Category: " + this.category;
	}
	
	public static User authenticate(String username, String password) {
        return find.where().eq("username", username)
            .eq("password", password).findList().get(0);
    }
	
	public String getRole() {
		return role;
	}

}
