package models;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.avaje.ebean.Ebean;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class AdminLog extends Model {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	private String recipeName;

	private String triggerChannelName;

	private String triggerMessage;

	private String stateOfTriggerActor;

	private String actionChannelName;

	private String actionMessage;

	private String stateOfActionActor;

	@ManyToOne
	private User user;

	private String userGroup;

	private Date date;

	public static Model.Finder<Long, AdminLog> find = new Model.Finder<Long, AdminLog>(
			Long.class, AdminLog.class);

	public AdminLog(String recipeName, String triggerChannelName,
			String triggerMessage, String actionChannelName,
			String actionMessage, String stateOfActionActor, User user,
			Date date, String userGroup) {
		super();
		this.recipeName = recipeName;
		this.triggerChannelName = triggerChannelName;
		this.triggerMessage = triggerMessage;
		this.actionChannelName = actionChannelName;
		this.actionMessage = actionMessage;
		this.stateOfActionActor = stateOfActionActor;
		this.user = user;
		this.date = date;
		this.userGroup = userGroup;
	}

	public String getRecipeName() {
		return recipeName;
	}

	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}

	public String getTriggerChannelName() {
		return triggerChannelName;
	}

	public void setTriggerChannelName(String triggerChannelName) {
		this.triggerChannelName = triggerChannelName;
	}

	public String getTriggerMessage() {
		return triggerMessage;
	}

	public void setTriggerMessage(String triggerMessage) {
		this.triggerMessage = triggerMessage;
	}

	public String getActionChannelName() {
		return actionChannelName;
	}

	public void setActionChannelName(String actionChannelName) {
		this.actionChannelName = actionChannelName;
	}

	public String getActionMessage() {
		return actionMessage;
	}

	public void setActionMessage(String actionMessage) {
		this.actionMessage = actionMessage;
	}

	public String getStateOfTriggerActor() {
		return stateOfTriggerActor;
	}

	public void setStateOfTriggerActor(String stateOfTriggerActor) {
		this.stateOfTriggerActor = stateOfTriggerActor;
	}

	public String getStateOfActionActor() {
		return stateOfActionActor;
	}

	public void setStateOfActionActor(String stateOfActionActor) {
		this.stateOfActionActor = stateOfActionActor;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
		setUserGroup(user.getUserGroup());
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDateString() {
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		String dateString = df.format(date);
		return dateString;
	}

	public long getId() {
		return id;
	}

	public String getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}

	public static List<AdminLog> getAllAdminLogs() {
		return Ebean.find(AdminLog.class).findList();
	}

	@Override
	public String toString() {
		return "AdminLog [id=" + id + ", recipeName=" + recipeName
				+ ", triggerChannelName=" + triggerChannelName
				+ ", triggerMessage=" + triggerMessage + ", actionChannelName="
				+ actionChannelName + ", actionMessage=" + actionMessage
				+ ", stateOfActionActor=" + stateOfActionActor + ", user="
				+ user + ", date=" + date + "]";
	}

}
