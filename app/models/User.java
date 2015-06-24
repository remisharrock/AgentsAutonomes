package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import play.data.validation.Constraints.Required;
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
	
	@Required
	private String username;
	
	@Required
	private String password;
	
	@Required
	private String role;
	
	@Required
	private String userGroup;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Recipe> recipes;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<AdminLog> adminLog;
	
	
	public static Model.Finder<Long, User> find = new Model.Finder<Long, User>(
			Long.class, User.class);
	
	public User(String username, String password, String role, String userGroup) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.userGroup = userGroup;
		this.recipes = new ArrayList<Recipe>();
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



	public String getUserGroup() {
		return userGroup;
	}



	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}



	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	public List<Recipe> getRecipes() {
		return this.recipes;
	}

	
//	public void setRecipesAkka(List<RecipeAkka> recipesAkka) {
//		this.recipesAkka = recipesAkka;
//	}
//
//	public List<RecipeAkka> getRecipesAkka() {
//		return this.recipesAkka;
//	}
	

	public static List<User> getAllUsers() {
		return Ebean.find(User.class).findList();
	}
	
	public static List<User> getAllUsersFromSameGroup(String userGroup) {
		return Ebean.find(User.class).where().eq("userGroup", userGroup).findList();
	}
	
	public List<AdminLog> getAdminLog() {
		return adminLog;
	}

	public void setAdminLog(List<AdminLog> adminLog) {
		this.adminLog = adminLog;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password="
				+ password + ", role=" + role + ", userGroup=" + userGroup
				+ ", recipes=" + recipes + "]";
	}
	
	public static User authenticate(String username, String password) {
		if (find.where().eq("username", username)
            .eq("password", password).findList().size() > 0) 
        return find.where().eq("username", username)
            .eq("password", password).findList().get(0);
		
		return null;
    }
	
	public Recipe getRecipesById(long id) {
		for(Recipe r : recipes){
			if(r.getId() == id)
				return r;
		}
		return null;
	}
	
	public static ArrayList<String> getAllUserGroups() {
		ArrayList<String> groupsList = new ArrayList<String>();
		for(User u: getAllUsers()) {
			if (!groupsList.contains(u.getUserGroup())) {
				groupsList.add(u.getUserGroup());
			}
		}
		return groupsList;
	}
	
	public static ArrayList<String> getAllUserGroupsExceptAdmin() {
		ArrayList<String> groupsList = new ArrayList<String>();
		for(User u: getAllUsers()) {
			if (u.getRole().equals("administrator")) {
				continue;
			}
			if (!groupsList.contains(u.getUserGroup())) {
				groupsList.add(u.getUserGroup());
			}
		}
		return groupsList;
	}
	
	public List<Recipe> getAllRecipesForUser() {
		return Ebean.find(Recipe.class).where().eq("USER_ID", id).findList();
	}

}
