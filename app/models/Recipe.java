package models;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import messages.AllMessages;
import messages.AllMessages.MessageEnvelope;

import org.apache.commons.lang3.text.WordUtils;

import play.db.ebean.Model;
import scala.Array;
import actors.AllActors;
import akka.actor.ActorRef;
import akka.actor.Props;

import com.avaje.ebean.Ebean;

@Entity
public class Recipe extends Model {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private long Id;

	private String title;

	private Boolean active;

	@ManyToOne
	private Channel triggerChannel;

	@ManyToOne
	private Trigger trigger;

	@OneToOne(cascade = CascadeType.ALL)
	private Field triggerField;

	@ManyToOne
	private Channel actionChannel;

	@ManyToOne
	private Action action;

	@OneToOne(cascade = CascadeType.ALL)
	private Field actionField;

	@ManyToOne
	private User user;

	private RecipeAkka recipeAkka;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Log> log;

	public static Model.Finder<Long, Recipe> find = new Model.Finder<Long, Recipe>(
			Long.class, Recipe.class);

	public Recipe() {
		// TODO Auto-generated constructor stub
		log = new ArrayList<Log>();
		recipeAkka = new RecipeAkka();
	}

	public static List<Recipe> getAllRecipes() {
		return Ebean.find(Recipe.class).findList();
	}

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
		recipeAkka.setTitle(title);
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
		recipeAkka.setActive(active);
	}

	public Channel getTriggerChannel() {
		return triggerChannel;
	}

	public void setTriggerChannel(Channel triggerChannel) {
		this.triggerChannel = triggerChannel;

		// this.triggerChannelId = triggerChannel.getId();
		/*
		 * There is a choice to do: 1) If the same user is creating different
		 * recipes with the same channels/triggers: 1- get the same actor 2- get
		 * different actors 2) If different users belonging to one group
		 */

		/*
		 * We are getting the list of users that belong to the same group and we
		 * are checking if there is an actor that already exists for the channel
		 * if there isn't => we create our actor if there is => we use the
		 * created actor
		 */
		List<User> allUsersFromSameGroup;
		if (controllers.Application.getUserLoggedIn() == null) {
			allUsersFromSameGroup = User.getAllUsersFromSameGroup(this
					.getUser().getUserGroup());
		} else {
			allUsersFromSameGroup = User
					.getAllUsersFromSameGroup(controllers.Application
							.getUserLoggedIn().getUserGroup());
		}

		for (User u : allUsersFromSameGroup) {
			for (Recipe r : u.getRecipes()) {
				if (r != this) {
					if (r != null) {
						if (r.getTriggerChannel().getId() == triggerChannel
								.getId()) {
							// it means that there is an actor that exists for
							// this group of users and this channel
							
							ActorRef existingActor = RecipeAkka.recipesMap.get(
									r.getId()).getTriggerChannelActor();
							recipeAkka.setTriggerChannelActor(existingActor);
							System.out
									.println("SAME ACTOR: Recipe akka trigger: "
											+ recipeAkka
													.getTriggerChannelActor());
							return;
						}
					}
				}
			}
		}

		/**
		 * TODO if actor of a channel already exists and we use an actor of an
		 * old recipe we have to make sure that the actor isn't deleted if we
		 * remove the recipe If it's deleted we have to create the same actor
		 * for the recipes that are using it
		 */

		ActorRef actorTrigger = createActorFromClassName(
				triggerChannel.getName(), "Trigger");
		recipeAkka.setTriggerChannelActor(actorTrigger);
		System.out.println("Recipe akka trigger: "
				+ recipeAkka.getTriggerChannelActor());
	}

	public Field getTriggerField() {
		return triggerField;
	}

	public void setTriggerField(Field triggerField) {
		this.triggerField = triggerField;
		recipeAkka.setTriggerField(triggerField);
//		recipeAkka.getTriggerMessage().setField(triggerField);
	}

	public Channel getActionChannel() {
		return actionChannel;
	}

	public void setActionChannel(Channel actionChannel) {
		this.actionChannel = actionChannel;

		// this.actionChannelId = actionChannel.getId();
		/*
		 * There is a choice to do: 1) If the same user is creating different
		 * recipes with the same channels/triggers: 1- get the same actor 2- get
		 * different actors 2) If different users belonging to one group
		 */

		/*
		 * We are getting the list of users that belong to the same group and we
		 * are checking if there is an actor that already exists for the channel
		 * if there isn't => we create our actor if there is => we use the
		 * created actor
		 */

		List<User> allUsersFromSameGroup;
		if (controllers.Application.getUserLoggedIn() == null) {
			allUsersFromSameGroup = User.getAllUsersFromSameGroup(this
					.getUser().getUserGroup());
		} else {
			allUsersFromSameGroup = User
					.getAllUsersFromSameGroup(controllers.Application
							.getUserLoggedIn().getUserGroup());
		}

		for (User u : allUsersFromSameGroup) {
			for (Recipe r : u.getRecipes()) {
				if (r != this) {
					if (r != null) {
						if (r.getActionChannel().getId() == actionChannel
								.getId()) {
							// it means that there is an actor that exists for
							// this group of users and this channel
							ActorRef existingActor = RecipeAkka.recipesMap.get(
									r.getId()).getActionChannelActor();
							recipeAkka.setActionChannelActor(existingActor);
							System.out
									.println("SAME ACTOR: Recipe akka action: "
											+ recipeAkka
													.getActionChannelActor());
							return;
						}
					}
				}
			}
		}

		/**
		 * TODO if actor of a channel already exists and we use an actor of an
		 * old recipe we have to make sure that the actor isn't deleted if we
		 * remove the recipe If it's deleted we have to create the same actor
		 * for the recipes that are using it
		 */
		// When we arrive here it means that the actor doesn't exist before
		ActorRef actorAction = createActorFromClassName(
				actionChannel.getName(), "Action");
		recipeAkka.setActionChannelActor(actorAction);
	}

	public Field getActionField() {
		return actionField;
	}

	public void setActionField(Field actionField) {
		this.actionField = actionField;
		recipeAkka.setActionField(actionField);
//		recipeAkka.getActionMessage().setField(actionField);
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
		recipeAkka.setUser(user);
	}

	public RecipeAkka getRecipeAkka() {
		return recipeAkka;
	}

	public void setRecipeAkka(RecipeAkka recipeAkka) {
		this.recipeAkka = recipeAkka;
	}

	public Trigger getTrigger() {
		return trigger;
	}

	public void setTrigger(Trigger trigger) {
		this.trigger = trigger;
		MessageEnvelope msg = createMessageFromClassName(trigger.getName(),
				recipeAkka);
		recipeAkka.setTriggerMessage(msg);
	}

	public Action getAction() {
		return action;
	}

	public void setAction(Action action) {
		this.action = action;
		
		MessageEnvelope msg = createMessageFromClassName(action.getName(),
				recipeAkka);
		recipeAkka.setActionMessage(msg);
	}

	public RecipeAkka createRecipeAkkaFromRecipe() {
		RecipeAkka ra = new RecipeAkka();
		ra.setTitle(this.title);
		ra.setActive(this.active);
		ra.setUser(this.user);
		ra.setTriggerField(this.triggerField);
		ra.setActionField(this.actionField);

		/**
		 * I should check, for users of the same group, if there is already an
		 * actor existing for a channel -> set this actor for a recipe. If not,
		 * create a new actor
		 */
		boolean triggerActorFound = false;
		for (Recipe r : Ebean.find(Recipe.class).findList()) {
			if (r.getId() != this.getId()
					&& RecipeAkka.recipesMap.containsKey(r.getId())) {
				if ((r.getTriggerChannel() == this.getTriggerChannel())
						&& (r.getUser().getUserGroup() == this.getUser()
								.getUserGroup())) {
					/**
					 * If we are here, it means that there exists in the hashmap
					 * a recipe, that belongs to the same group and has the same
					 * trigger channel/actor of the recipe that we are working
					 * on. so we use this actor
					 */
					ra.setTriggerChannelActor(RecipeAkka.recipesMap.get(
							r.getId()).getTriggerChannelActor());
					triggerActorFound = true;
				}
			}
		}
		if (!triggerActorFound) {
			ra.setTriggerChannelActor(createActorFromClassName(
					triggerChannel.getName(), "Trigger"));
		}


		boolean actionActorFound = false;
		for (Recipe r : Ebean.find(Recipe.class).findList()) {
			if (r.getId() != this.getId()
					&& RecipeAkka.recipesMap.containsKey(r.getId())) {
				if ((r.getActionChannel() == this.getActionChannel())
						&& (r.getUser().getUserGroup() == this.getUser()
								.getUserGroup())) {
					/**
					 * If we are here, it means that there exists in the hashmap
					 * a recipe, that belongs to the same group and has the same
					 * trigger channel/actor of the recipe that we are working
					 * on. so we use this actor
					 */
					ra.setActionChannelActor(RecipeAkka.recipesMap.get(
							r.getId()).getActionChannelActor());
					actionActorFound = true;
				}
			}
		}
		if (!actionActorFound) {
			ra.setActionChannelActor(createActorFromClassName(
					actionChannel.getName(), "Action"));
		}


		ra.setTriggerMessage(createMessageFromClassName(this.getTrigger()
				.getName(), ra));

		ra.setActionMessage(createMessageFromClassName(this.getAction()
				.getName(), ra));


		return ra;

	}

	private ActorRef createActorFromClassName(String className, String type) {
		if (type.equals("Trigger")) {
			String classNameFull = WordUtils.capitalize(className).replace(" ",
					"")
					+ "Actor";
			Class<?> classActor = null;
			try {
				classActor = Class.forName("actors.AllActors$" + classNameFull);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ActorRef actor = AllActors.system.actorOf(Props.create(classActor),
					classNameFull + "Trigger" + getId());
			return actor;

		} else if (type.equals("Action")) {
			String classNameFull = WordUtils.capitalize(className).replace(" ",
					"")
					+ "Actor";
			Class<?> classActor = null;
			try {
				classActor = Class.forName("actors.AllActors$" + classNameFull);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			ActorRef actor = AllActors.system.actorOf(Props.create(classActor),
					classNameFull + "Action" + getId());
			return actor;
		}

		return null;

	}

	private MessageEnvelope createMessageFromClassName(String className,
			RecipeAkka recipe) {
		String classNameMessage = WordUtils.capitalize(className).replace(" ",
				"")
				+ "Message";
		Class<?> classTriggerMessage = null;
		try {
			classTriggerMessage = Class.forName("messages.AllMessages$" + classNameMessage);
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		MessageEnvelope message = null;
		try {
			Class<?>[] types = new Class[] { messages.AllMessages.class,
					RecipeAkka.class };
			Constructor<?> cst = classTriggerMessage.getConstructor(types);
			message = (MessageEnvelope) cst.newInstance(
					messages.AllMessages.getInstance(), recipe);
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return message;
	}

	@Override
	public String toString() {
		return "Recipe [Id=" + Id + ", title=" + title + ", active=" + active
				+ ", triggerChannel=" + triggerChannel + ", triggerField="
				+ triggerField + ", actionChannel=" + actionChannel + ", "
				// + "actionField=" + actionField
				+ ", user=" + user + "]";
	}

	public List<Log> getLog() {
		return log;
	}

	public void setLog(ArrayList<Log> log) {
		this.log = log;
	}

	public List<Log> getLogReverseOrder() {
		List<Log> logReverse = new LinkedList<Log>();
		for (int i = log.size() - 1; i >= 0; i--) {
			logReverse.add(log.get(i));
		}

		return logReverse;
	}

	public static Recipe getRecipeById(Long id) {
		return Recipe.find.byId(id);
	}
	

}
