package models;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

//@Entity
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
	private List<BindedRecipe> bindedRecipes;

	public static Model.Finder<Long, User> find = new Model.Finder<Long, User>(Long.class, User.class);

	public User(String username, String password, String role, String userGroup) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.userGroup = userGroup;
		this.bindedRecipes = new ArrayList<BindedRecipe>();
	}

	public BindedRecipe getRecipesByUserId(long id) {
		for (BindedRecipe r : bindedRecipes) {
			if (r.getId() == id)
				return r;
		}
		return null;
	}

	// TODO
	public static ArrayList<String> getAllUserGroups() {
		return (ArrayList<String>) User.find.findList().stream().map(x -> x.getUserGroup()).distinct()
				.collect(Collectors.toList());
		// ArrayList<String> groupsList = new ArrayList<String>();
		// for (User u : User.find.findList()) {
		// if (!groupsList.contains(u.getUserGroup())) {
		// groupsList.add(u.getUserGroup());
		// }
		// }
		// return groupsList;
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

	@Deprecated
	public List<BindedRecipe> getRecipes() {
		return this.getBindedRecipes();
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}

	public List<BindedRecipe> getBindedRecipes() {
		return bindedRecipes;
	}

	public void setBindedRecipes(List<BindedRecipe> bindedRecipes) {
		this.bindedRecipes = bindedRecipes;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", userGroup=" + userGroup + ", bindedRecipes=" + bindedRecipes + "]";
	}
}