package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

@Entity
public class Log extends Model {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;
	
	private String logInfo;
	
	private Date doneAt;
	
	@ManyToOne
	private Recipe recipe;
	
	public static Model.Finder<Long, Log> find = new Model.Finder<Long, Log>(
			Long.class, Log.class);
	
	public Log(String logInfo, Date doneAt) {
		this.logInfo = logInfo;
		this.doneAt = doneAt;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLogInfo() {
		return logInfo;
	}

	public void setLogInfo(String logInfo) {
		this.logInfo = logInfo;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public Date getDoneAt() {
		return doneAt;
	}

	public void setDoneAt(Date doneAt) {
		this.doneAt = doneAt;
	}
	
	
	
	

}
