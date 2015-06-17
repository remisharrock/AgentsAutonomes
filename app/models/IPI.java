package models;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

import logic.CausalRelation;
import logic.LogicController;
import logic.MessageMap.Mapper;
import logic.RandomScheduler.StopCriteria;
import logic.StdRandom;
import scala.concurrent.duration.Duration;
import akka.actor.ActorRef;
import akka.actor.UntypedActor;

/**
 * This is meant to ease the web interface building process.
 */
public class IPI implements InterfaceProxy {

	public boolean authenticateUser(String name, String password) {
		return User.find.findList().stream().anyMatch(x -> x.getUsername() == name && x.getPassword() == password);
	}

	public List<Channel> getChannels() {
		return Channel.find.findList();
	}

	/**
	 * Of course it sends back registered actors, we don't know at the others.
	 * 
	 * @param channel
	 * @return
	 */
	public List<Actor> getActorsForChannelAndUsers(Channel channel, User user) {
		return Actor.find.findList().stream().filter(x -> x.getChannel() == channel && x.getUser() == user)
				.collect(Collectors.toList());
	}

	public List<Trigger> getTriggersForChannel(Channel channel) {
		return channel.getTriggers();
	}

	public List<Action> getActionsForChannel(Channel channel) {
		return channel.getActions();
	}

	/**
	 * Add an actor to the local database
	 * 
	 * @param user
	 * @param actorName
	 *            Name of the actor. Must be unique. Mustn't start by $. You can
	 *            type in plain English. Will be encoded.
	 * @param channel
	 *            Channel of the actor.
	 */
	public Actor registerActorForUser(User user, String actorName, Class<? extends UntypedActor> clazz, Channel channel) {
		Actor actor = new Actor(actorName, channel, user);
		actor.save();
		LogicController.getSystemProxy().createActorOf(channel, actorName);
		return actor;
	}

	public void unregisterActor(Actor victim) {
		LogicController.getSystemProxy().deleteActor(
				LogicController.getSystemProxy().getActorByName(victim.getActorName()));
	}

	/**
	 * If it doesn't work, tell the backend team to add a custom mapper, they'll
	 * know what it means.
	 * 
	 * Here you can specify the mapper you want to use.
	 * 
	 * @param user
	 * @param recipe
	 * @param triggerActorModel
	 * @param actionActorModel
	 * @param mapperName
	 *            the name of the mapper used. If null, the default will be
	 *            used.
	 * @param description
	 * @param groups
	 *            This can be null if you don't want to use it. Additionnal
	 *            groups you want to add that recipe to. Actually, for the
	 *            backend, it's called a label.
	 */
	public BindedRecipe bindRecipe(User user, Recipe recipe, Actor triggerActorModel, Actor actionActorModel,
			String mapperName, String description, List<String> groups) {
		ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(triggerActorModel.getActorName());
		ActorRef actionActor = LogicController.getSystemProxy().getActorByName(actionActorModel.getActorName());
		Class<?> triggerClazz = recipe.getTrigger().getClazz();
		Class<?> actionClazz = recipe.getAction().getClazz();
		UnaryOperator<Object> mappingFunction = LogicController.getMessageMap().getMapperByName(mapperName)
				.getMapping();
		List<String> label = new ArrayList<String>();
		label.add(user.getUsername());
		label.addAll(groups);

		// Create the causal relation
		LogicController.getCommutator().addCausalRelation(triggerActor, triggerClazz, description, actionActor,
				mappingFunction, label);

		// Create and return the interface object
		return new BindedRecipe(recipe, triggerActorModel, actionActorModel, user);
	}

	/**
	 * Syntactic sugar
	 * 
	 * @param user
	 * @param recipe
	 * @param triggerActorModel
	 * @param actionActorModel
	 * @param description
	 * @param groups
	 * @return
	 */
	public BindedRecipe activateRecipe(User user, Recipe recipe, Actor triggerActorModel, Actor actionActorModel,
			String description, List<String> groups) {
		return bindRecipe(user, recipe, triggerActorModel, actionActorModel, null, description, groups);
	}

	public void deactivateRecipe(Recipe recipe, Actor triggerActorModel, Actor actionActorModel) {
		ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(triggerActorModel.getActorName());
		ActorRef actionActor = LogicController.getSystemProxy().getActorByName(actionActorModel.getActorName());
		Class<?> triggerClazz = recipe.getTrigger().getClazz();
		LogicController.getCommutator().removeCausalRelation(triggerActor, triggerClazz, actionActor);
	}

	/**
	 * @param user
	 *            If user is null, send all known activated recipes (for example
	 *            for admin)
	 * @return
	 */
	public List<BindedRecipe> getActivatedRecipesByUser(User user) {
		/*
		 * Changer TODO
		 */
		return LogicController
				.getCommutator()
				.getCausalRelationByLabel(x -> user == null ? true : x.stream().anyMatch(item -> item.equals(user)))
				.stream()
				.map(c -> {
					Actor triggerActor = Actor.find.findList().stream()
							.filter(a -> a.getActorName().equals(c.getTriggerActor().path().name())).findFirst().get();
					Actor actionActor = Actor.find.findList().stream()
							.filter(a -> a.getActorName().equals(c.getActionActor().path().name())).findFirst().get();
					Recipe recipe = Recipe.find
							.findList()
							.stream()
							.filter(r -> r.getActionChannel() == triggerActor.getChannel()
									&& r.getTriggerChannel() == actionActor.getChannel()
									&& r.getTrigger().getClazz() == c.getTriggerMessageClass()).findFirst().get();
					return new BindedRecipe(recipe, triggerActor, actionActor, user);
				}).collect(Collectors.toList());
	}

	/**
	 * Modality contains basically two interesting fields for here: value, which
	 * is an object, and clazz, which is the real class of the object value. So
	 * if you have a String in the value, you can access it by:
	 * <code>String string = (String) value;</code>
	 * 
	 * @param trigger
	 * @return
	 */
	public List<Modality> getModalitiesForTrigger(Trigger trigger) {
		return trigger.getModalities();
	}

	/**
	 * Not sure whether you'd find it useful
	 * 
	 * @param trigger
	 * @param modalityName
	 * @return a list can be null
	 */
	public List<String> tryToGetStringModalityByModalityNameForTrigger(Trigger trigger, String modalityName) {
		return trigger.getModalities().stream().filter(x -> x.getName() == modalityName)
				.map(x -> (String) x.getValue()).collect(Collectors.toList());
	}

	public List<String> getMapperNamesByTriggerAndActionClasses(Trigger trigger, Action action) {
		return LogicController.getMessageMap().getMappersFor(trigger.getClazz(), action.getClazz()).stream()
				.map(m -> m.getName()).collect(Collectors.toList());
	}

	public void emitTriggerForActivatedRecipe(BindedRecipe activatedRecipe, Trigger trigger) {

		ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(
				activatedRecipe.getTriggerActor().getActorName());
		Class<?> triggerClass = activatedRecipe.getRecipe().getTrigger().getClazz();
		LogicController.getCommutator().emitTriggerMessage(triggerActor, triggerClass, () -> {
			Object message = null;
			try {
				message = activatedRecipe.getRecipe().getAction().getClazz().newInstance();
				return activatedRecipe.getRecipe().getAction().getClazz().newInstance();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				return message;
			}
		});
	}

	/**
	 * For admin view perhaps
	 */
	public void getAllActivatedRecipes() {
		getActivatedRecipesByUser(null);
	}

	/**
	 * Known to be buggy if you try to say "stop in X minutes", tell the backend
	 * team to unbug it.
	 * 
	 * @param activatedRecipe
	 * @param time
	 * @param minPeriod
	 * @param maxPeriod
	 */
	public void addRandomTriggerUntilOccurenceByUniform(BindedRecipe activatedRecipe, int time, int minPeriod,
			int maxPeriod) {
		LogicController.getScheduler().addRandomIssue(
				Duration.Zero(),
				() -> Duration.create(StdRandom.uniform(minPeriod, maxPeriod), TimeUnit.SECONDS),
				StopCriteria.set(StopCriteria.TIME, time),
				() -> {
					ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(
							activatedRecipe.getTriggerActor().getActorName());
					Class<?> triggerClass = activatedRecipe.getRecipe().getTrigger().getClazz();
					LogicController.getCommutator().emitTriggerMessage(triggerActor, triggerClass, () -> {
						Object message = null;
						try {
							message = activatedRecipe.getRecipe().getAction().getClazz().newInstance();
						} catch (Exception e) {
							e.printStackTrace();
						} finally {
							return message;
						}
					});
				});
	}

	public void addRandomTriggerUntilNeverByUniform(BindedRecipe activatedRecipe, int minPeriod, int maxPeriod) {
		LogicController.getScheduler().addRandomIssue(
				Duration.Zero(),
				() -> Duration.create(StdRandom.uniform(minPeriod, maxPeriod), TimeUnit.SECONDS),
				StopCriteria.set(StopCriteria.NEVER, null),
				() -> {
					ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(
							activatedRecipe.getTriggerActor().getActorName());
					Class<?> triggerClass = activatedRecipe.getRecipe().getTrigger().getClazz();
					LogicController.getCommutator().emitTriggerMessage(triggerActor, triggerClass, () -> {
						Object message = null;
						try {
							message = activatedRecipe.getRecipe().getAction().getClazz().newInstance();
						} catch (Exception e) {
							e.printStackTrace();
						} finally {
							return message;
						}
					});
				});
	}

	/**
	 * Label can be username, room and any other category of causal relation.
	 * 
	 * A causal relation is shown if and only if all strings in label are in the
	 * causal relation tested.
	 */
	public void displayCausalGraphForLabel(List<String> label) {
		/*
		 * This predicate answers yes if and only if all strings in label are in
		 * the causal relation tested. If label is null, then it always answer
		 * true.
		 */
		Predicate<CausalRelation> predicate = label == null ? e -> true : w -> w.getLabel().stream()
				.allMatch(x -> label.stream().anyMatch(y -> x.equals(y)));
		String filepath = "../export.txt";
		File file = LogicController.getCommutator().exportCausalGraph(predicate, new File(filepath));

		String[] args = { filepath };
		try {
			Runtime.getRuntime().exec("java -jar lib/Visual.jar " + filepath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Display all.
	 */
	public void displayCausalGraphAll() {
		displayCausalGraphForLabel(null);
	}
}
