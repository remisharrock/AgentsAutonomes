package models;

import java.util.List;

import akka.actor.UntypedActor;

/**
 * Implementation of this interface MUST be stateless to ensure they are clean.
 */
public interface InterfaceProxy {

	public boolean authenticateUser(String name, String pwdHash);

	public List<Channel> getChannels();

	/**
	 * Of course it sends back registered actors, we don't know at the others.
	 * 
	 * @param channel
	 * @return
	 */
	public List<Actor> getActorsForChannelAndUsers(Channel channel, User user);

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
	public Actor registerActorForUser(User user, String actorName, Class<? extends UntypedActor> clazz, Channel channel);

	public void unregisterActor(Actor victim);

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
			String description, List<String> groups);

	public void deactivateRecipe(Recipe recipe, Actor triggerActorModel, Actor actionActorModel);

	/**
	 * @param user
	 *            If user is null, send all known activated recipes (for example
	 *            for admin)
	 * @return
	 */
	public List<ActivatedRecipe> getActivatedRecipesByUser(User user);

	/**
	 * For admin view perhaps
	 */
	public void getAllActivatedRecipes();

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
			int maxPeriod);

	public void addRandomTriggerUntilNeverByUniform(ActivatedRecipe activatedRecipe, int minPeriod, int maxPeriod);

	/**
	 * Label can be username, room and any other category of causal relation.
	 * 
	 * A causal relation is shown if and only if all strings in label are in the
	 * causal relation tested.
	 */
	public void displayCausalGraphForLabel(List<String> label);

	/**
	 * Display all.
	 */
	public void displayCausalGraphAll();
}
