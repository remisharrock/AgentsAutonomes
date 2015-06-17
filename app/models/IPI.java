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
import logic.RandomScheduler.StopCriteria;
import logic.StdRandom;
import scala.concurrent.duration.Duration;
import akka.actor.ActorRef;
import akka.actor.UntypedActor;

/**
 * THis is meant to ease the web interface building process.
 */
public class IPI implements InterfaceProxy {

	public boolean authenticateUser(String name, String pwdHash) {
		return User.find.findList().stream().anyMatch(x -> x.getName() == name && x.getPwdHash() == pwdHash);
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
		return channel.getActors().stream().filter(x -> x.getChannel() == channel && x.getUser() == user)
				.collect(Collectors.toList());
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
		//actor.save();
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
	 * @param user
	 * @param recipe
	 * @param triggerActorModel
	 * @param actionActorModel
	 * @param description
	 * @param groups
	 *            This can be null if you don't want to use it. Additionnal
	 *            groups you want to add that recipe to. Actually, for the
	 *            backend, it's called a label.
	 */
	public ActivatedRecipe activateRecipe(User user, Recipe recipe, Actor triggerActorModel, Actor actionActorModel,
			String description, List<String> groups) {
		ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(triggerActorModel.getActorName());
		ActorRef actionActor = LogicController.getSystemProxy().getActorByName(actionActorModel.getActorName());
		Class<?> triggerClazz = recipe.getTrigger().getClazz();
		Class<?> actionClazz = recipe.getAction().getClazz();
		UnaryOperator<Object> mapper = LogicController.getMessageMap().getMapper(triggerClazz, actionClazz);
		List<String> label = new ArrayList<String>();
		label.add(user.getName());
		label.addAll(groups);
		LogicController.getCommutator().addCausalRelation(triggerActor, triggerClazz, description, actionActor, mapper,
				label);
		return new ActivatedRecipe(recipe, triggerActorModel, actionActorModel);
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
	public List<ActivatedRecipe> getActivatedRecipesByUser(User user) {
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
					return new ActivatedRecipe(recipe, triggerActor, actionActor);
				}).collect(Collectors.toList());
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
	public void addRandomTriggerUntilOccurenceByUniform(ActivatedRecipe activatedRecipe, int time, int minPeriod,
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
						try {
							return activatedRecipe.getRecipe().getActionChannel().getClazz().newInstance();
						} catch (Exception e) {
							e.printStackTrace();
							return null;
						}
					});
				});
	}

	public void addRandomTriggerUntilNeverByUniform(ActivatedRecipe activatedRecipe, int minPeriod, int maxPeriod) {
		LogicController.getScheduler().addRandomIssue(
				Duration.Zero(),
				() -> Duration.create(StdRandom.uniform(minPeriod, maxPeriod), TimeUnit.SECONDS),
				StopCriteria.set(StopCriteria.NEVER, null),
				() -> {
					ActorRef triggerActor = LogicController.getSystemProxy().getActorByName(
							activatedRecipe.getTriggerActor().getActorName());
					Class<?> triggerClass = activatedRecipe.getRecipe().getTrigger().getClazz();
					LogicController.getCommutator().emitTriggerMessage(triggerActor, triggerClass, () -> {
						try {
							return activatedRecipe.getRecipe().getActionChannel().getClazz().newInstance();
						} catch (Exception e) {
							e.printStackTrace();
							return null;
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
