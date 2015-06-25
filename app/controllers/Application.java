package controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import main.Scheduler;
import main.Script;
import main.StdRandom;
import main.Scheduler.CancellableRef;
import main.Scheduler.RandomPeriodStrategy;
import main.Scheduler.StopCriteria;
import models.Action;
import models.AdminLog;
import models.Channel;
import models.Field;
import models.Log;
import models.Recipe;
import models.RecipeAkka;
import models.Trigger;
import models.User;
import play.data.DynamicForm;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import scala.concurrent.duration.Duration;
import views.html.*;

import com.avaje.ebean.Ebean;

public class Application extends Controller {

	private static User userLoggedIn = null;

	public static User getUserLoggedIn() {
		return userLoggedIn;
	}

	private static Recipe recipe;
	private static String activationType;

	public static Result index() {
		Script.export("svg");
		return ok(index.render());
	}

	public static Result homeForm() {
		if (userLoggedIn != null) {
			if (userLoggedIn.getRole().equals("administrator"))
				// return administratorView();
				return ok(administratorChooseView.render());
			else
				return ok(chooseView.render(userLoggedIn));
		}

		DynamicForm requestData = Form.form().bindFromRequest();

		String username = requestData.get("username");
		String password = requestData.get("password");

		User user = User.authenticate(username, password);
		if (user == null) {
			return ok(index.render());
		}

		else {
			userLoggedIn = user;
			if (userLoggedIn.getRole().equals("administrator")) {

				List<Channel> channelsList = Channel.getAllChannels();
				return ok(administratorChooseView.render());
			} else {
				return ok(chooseView.render(userLoggedIn));

			}

		}

	}

	public static Result loginForm() {
		// recipe=null;
		if (userLoggedIn != null) {
			if (userLoggedIn.getRole().equals("administrator"))
				// return administratorView();
				return ok(administratorChooseView.render());
			else
				return ok(chooseView.render(userLoggedIn));
		}

		DynamicForm requestData = Form.form().bindFromRequest();

		String username = requestData.get("username");
		String password = requestData.get("password");

		User user = User.authenticate(username, password);
		if (user == null) {
			return ok(index.render());
		}

		else {
			userLoggedIn = user;
			if (userLoggedIn.getRole().equals("administrator")) {

				List<Channel> channelsList = Channel.getAllChannels();
				return ok(administratorChooseView.render());
			} else {
				return ok(chooseView.render(userLoggedIn));

			}

		}

	}

	public static Result administratorView() {
		DynamicForm requestData = Form.form().bindFromRequest();
		List<Channel> channelsList = Channel.getAllChannels();
		if (requestData.get("manualActivationButton") != null)
			activationType = "manualActivationButton";
		else if (requestData.get("periodicActivationButton") != null)
			activationType = "periodicActivationButton";
		else if (requestData.get("randomActivationButton") != null)
			activationType = "randomActivationButton";
		return ok(administratorView.render(channelsList));
	}

	/*
	 * public static Result administratorView() { List<Channel> channelsList =
	 * Channel.getAllChannels(); return
	 * ok(administratorView.render(channelsList)); }
	 */

	public static Result chooseView() {

		DynamicForm requestData = Form.form().bindFromRequest();

		if (requestData.get("viewRecipesButton") != null) {
			return ok(viewRecipes.render(userLoggedIn));
		} else {
			recipe = new Recipe();
			recipe.setUser(userLoggedIn);
			List<Channel> channelsList = Channel.getAllChannels();
			return ok(chooseTriggerChannel.render(channelsList));
		}

	}

	public static Result viewAdministratorLog() {
		List<AdminLog> logs = AdminLog.getAllAdminLogs();
		return ok(administratorLog.render(logs));
	}

	public static Result submitForm() throws IOException {
		List<Channel> channelsList = Channel.getAllChannels();
		return ok(chooseTriggerChannel.render(channelsList));
	}

	public static Result chooseTrigger(Long channelId) {
		Channel channel = Channel.find.byId(channelId);
		recipe.setTriggerChannel(channel);
		channel.save();
		return ok(chooseTrigger.render(channel));
	}

	public static Result completeTriggerFields(Long triggerId) {

		Trigger trigger = Trigger.find.byId(triggerId);
		recipe.setTrigger(trigger);
		DynamicForm requestData = Form.form().bindFromRequest();
		String fieldName = trigger.getFieldName();
		if (fieldName != null && !fieldName.equals("")) {
			String triggerFieldValue = requestData.get(fieldName);
			Field f = new Field(fieldName, triggerFieldValue);
			recipe.setTriggerField(f);
		}

		return ok(completeTriggerFields.render(trigger));
	}

	public static Result chooseActionChannel() {
		List<Channel> channelsList = Channel.getAllChannels();
		return ok(chooseActionChannel.render(channelsList));
	}

	public static Result chooseAction(Long channelId) {
		Channel channel = Channel.find.byId(channelId);
		recipe.setActionChannel(channel);
		channel.save();

		return ok(chooseAction.render(channel));
	}

	public static Result completeActionFields(Long actionId) {

		Action action = Action.find.byId(actionId);

		DynamicForm requestData = Form.form().bindFromRequest();

		recipe.setAction(action);
		// HashMap<Field, String> actionFields = new HashMap<Field, String>();
		// for (Field f : action.getFields()) {
		// actionFields.put(f, requestData.get(f.getName()));
		// }

		String fieldName = action.getFieldName();
		if (fieldName != null && !fieldName.equals("")) {
			String actionFieldValue = requestData.get(fieldName);
			Field f = new Field(fieldName, actionFieldValue);
			recipe.setActionField(f);
		}

		return ok(completeActionFields.render(action));
	}

	public static Result createRecipe() {
		return ok(createRecipe.render(recipe));
	}

	public static Result viewRecipesAfterCreate() {
		DynamicForm requestData = Form.form().bindFromRequest();

		System.out.println("my recipe title: " + requestData.get("recipeTitle"));
		recipe.setTitle(requestData.get("recipeTitle"));
		recipe.setActive(true);

		Log l1 = new Log("Recipe creation", new Date());
		l1.setRecipe(recipe);

		recipe.getLog().add(l1);

		recipe.save();

		RecipeAkka.recipesMap.put(recipe.getId(), recipe.getRecipeAkka());
		Script.export("svg");
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result viewRecipes() {
		// NOT BEING USED
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result activateTrigger(Long triggerId) {

		List<Recipe> recipesList = Ebean.find(Recipe.class).findList();

		for (int i = 0; i < recipesList.size(); i++) {
			if (recipesList.get(i).getTriggerChannel().getId() == triggerId) {
				Trigger trigger = null;
				for (int j = 0; j < recipesList.get(i).getTriggerChannel().getTriggers().size(); j++) {
					if (recipesList.get(i).getTriggerChannel().getTriggers().get(j).getId() == triggerId) {
						trigger = recipesList.get(i).getTriggerChannel().getTriggers().get(j);
					}
				}
			}
		}

		return ok();

	}

	public static Result randomlyActivationChosen(Long triggerId) {

		ArrayList<String> userGroupList = User.getAllUserGroupsExceptAdmin();
		ArrayList<String> userGroupsChosen = new ArrayList<String>();
		DynamicForm requestData = Form.form().bindFromRequest();

		play.Logger.info("liste " + userGroupsChosen);
		int numberOccurences = Integer.parseInt(requestData.get("numberOccurences"));
		play.Logger.info("occurences " + numberOccurences);

		// Long triggerId = Long.parseLong(requestData.get("trigger_id"));

		if (requestData.get("allUserGroups") != null) {
			for (Recipe it : Trigger.find.byId(triggerId).getRecipes()) {
				play.Logger.info("boolean recipe " + it.getActive() + "pour " + it.getTitle());

				if (it.getActive()) {
					if ((requestData.get("activateTriggerPoissonButton") != null)) {
						RandomPeriodStrategy randomPeriodStrategy = new RandomPeriodStrategy() {
							@Override
							public Duration getPeriod() {
								return Duration.create(StdRandom.poisson(40), TimeUnit.SECONDS);
							}
						};
						SystemController.scheduler.periodicallyActivate(randomPeriodStrategy,
								new Scheduler.StopCriteria(StopCriteria.TYPE.OCCURENCE, numberOccurences), it);
					}
				}

			}
		} else {
			for (String userGroup : userGroupList) {
				if (requestData.get(userGroup) != null) {
					userGroupsChosen.add(userGroup);
				}
			}
			for (Recipe it : Trigger.find.byId(triggerId).getRecipes()) {

				if (it.getActive()) {
					if ((requestData.get("activateTriggerPoissonButton") != null)
							&& (userGroupsChosen.contains(it.getUser().getUserGroup()))) {
						RandomPeriodStrategy randomPeriodStrategy = new RandomPeriodStrategy() {
							@Override
							public Duration getPeriod() {
								return Duration.create(StdRandom.poisson(40), TimeUnit.SECONDS);
							}
						};
						SystemController.scheduler.periodicallyActivate(randomPeriodStrategy,
								new Scheduler.StopCriteria(StopCriteria.TYPE.OCCURENCE, numberOccurences), it);
					}

				}

			}
		}

		List<AdminLog> logs = AdminLog.getAllAdminLogs();
		return ok(administratorLog.render(logs));
	}

	public static Result periodicallyActivationChosen(Long triggerId) {

		ArrayList<String> userGroupList = User.getAllUserGroupsExceptAdmin();
		ArrayList<String> userGroupsChosen = new ArrayList<String>();
		DynamicForm requestData = Form.form().bindFromRequest();

		int numberOccurences = Integer.parseInt(requestData.get("numberOccurences"));
		final Long period = Long.parseLong(requestData.get("periodTriggerActivation"));

		if (requestData.get("allUserGroups") != null) {
			for (Recipe it : Trigger.find.byId(triggerId).getRecipes()) {

				if (it.getActive()) {
					if (requestData.get("activateTriggerPeriodicallyButton") != null) {
						RandomPeriodStrategy randomPeriodStrategy = new RandomPeriodStrategy() {
							@Override
							public Duration getPeriod() {
								return Duration.create(period, TimeUnit.SECONDS);
							}
						};
						SystemController.scheduler.periodicallyActivate(randomPeriodStrategy,
								new Scheduler.StopCriteria(StopCriteria.TYPE.OCCURENCE, numberOccurences), it);
					}

				}

			}
		} else {
			for (String userGroup : userGroupList) {
				if (requestData.get(userGroup) != null) {
					userGroupsChosen.add(userGroup);
				}
			}
			for (Recipe it : Trigger.find.byId(triggerId).getRecipes()) {
				if (it.getActive()) {
					if ((requestData.get("activateTriggerPeriodicallyButton") != null)
							&& (userGroupsChosen.contains(it.getUser().getUserGroup()))) {
						RandomPeriodStrategy randomPeriodStrategy = new RandomPeriodStrategy() {
							@Override
							public Duration getPeriod() {
								return Duration.create(period, TimeUnit.SECONDS);
							}
						};
						SystemController.scheduler.periodicallyActivate(randomPeriodStrategy,
								new Scheduler.StopCriteria(StopCriteria.TYPE.OCCURENCE, numberOccurences), it);
					}

				}

			}
		}

		List<AdminLog> logs = AdminLog.getAllAdminLogs();
		return ok(administratorLog.render(logs));
	}

	public static Result manualActivationChosen(Long triggerId) {

		ArrayList<String> userGroupList = User.getAllUserGroupsExceptAdmin();
		ArrayList<String> userGroupsChosen = new ArrayList<String>();
		DynamicForm requestData = Form.form().bindFromRequest();

		// Long triggerId = Long.parseLong(requestData.get("trigger_id"));
		
		String triggerName = Trigger.find.byId(triggerId).getName();

		if (requestData.get("allUserGroups") != null) {
			for (Recipe it : Trigger.find.byId(triggerId).getRecipes()) {

				if (it.getActive()) {
					if (requestData.get("activateTriggerManuallyButton") != null) {
						RandomPeriodStrategy randomPeriodStrategy = new RandomPeriodStrategy() {
							@Override
							public Duration getPeriod() {
								return Duration.create(0, TimeUnit.SECONDS);
							}
						};
						SystemController.scheduler.periodicallyActivate(randomPeriodStrategy,
								new Scheduler.StopCriteria(StopCriteria.TYPE.OCCURENCE, 1), it);
					}
				}

			}
		} else {
			for (String userGroup : userGroupList) {
				if (requestData.get(userGroup) != null) {
					userGroupsChosen.add(userGroup);
				}
			}
			for (Recipe it : Trigger.find.byId(triggerId).getRecipes()) {
				if (it.getActive()) {
					if ((requestData.get("activateTriggerManuallyButton") != null)
							&& (userGroupsChosen.contains(it.getUser().getUserGroup()))) {
						RandomPeriodStrategy randomPeriodStrategy = new RandomPeriodStrategy() {
							@Override
							public Duration getPeriod() {
								return Duration.create(0, TimeUnit.SECONDS);
							}
						};
						SystemController.scheduler.periodicallyActivate(randomPeriodStrategy,
								new Scheduler.StopCriteria(StopCriteria.TYPE.OCCURENCE, 1), it);
					}

				}

			}
		}

		return ok(administratorActivateManually.render(triggerId, userGroupList, triggerName));
	}

	public static Result chooseActivationType(Long triggerId) {

		// DynamicForm requestData = Form.form().bindFromRequest();

		List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
		ArrayList<String> userGroupList = User.getAllUserGroupsExceptAdmin();
		
		String triggerName = Trigger.find.byId(triggerId).getName();

		if (activationType.equals("manualActivationButton"))
			return ok(administratorActivateManually.render(triggerId, userGroupList, triggerName));
		else if (activationType.equals("periodicActivationButton"))
			return ok(administratorActivatePeriodically.render(triggerId, userGroupList, triggerName));
		else
			// if(activationType.equals("randomActivationButton"))
			return ok(administratorActivateRandomly.render(triggerId, userGroupList, triggerName));

	}

	public static Result viewRecipeLog() {
		DynamicForm requestData = Form.form().bindFromRequest();
		if (userLoggedIn != null && requestData.get("viewRecipesLog") != null) {
			long recipeId = Long.parseLong(requestData.get("viewRecipesLog"));
			Recipe r = userLoggedIn.getRecipesById(recipeId);
			return ok(viewRecipeLog.render(userLoggedIn, r));
		} else
			return ok(index.render());
	}

	public static Result deleteRecipe() {
		DynamicForm requestData = Form.form().bindFromRequest();
		if (userLoggedIn != null && requestData.get("deleteRecipe") != null) {
			long recipeId = Long.parseLong(requestData.get("deleteRecipe"));

			Recipe r = userLoggedIn.getRecipesById(recipeId);
			userLoggedIn.getRecipes().remove(r);
			r.delete();
			RecipeAkka.recipesMap.remove(r.getId());
			Script.export("svg");
		}
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result activateRecipe() {
		DynamicForm requestData = Form.form().bindFromRequest();
		if (userLoggedIn != null) {
			if (requestData.get("RecipeOff") != null) {
				long recipeId = Long.parseLong(requestData.get("RecipeOff"));
				Recipe r = userLoggedIn.getRecipesById(recipeId);
				if (r.getActive()) {
					r.setActive(false);
					r.getLog().add(new Log("Recipe turned off.", new Date()));
					r.save();
				}
			} else if (requestData.get("RecipeOn") != null) {
				long recipeId = Long.parseLong(requestData.get("RecipeOn"));
				Recipe r = userLoggedIn.getRecipesById(recipeId);
				if (r.getActive() == false) {
					r.setActive(true);
					r.getLog().add(new Log("Recipe turned on.", new Date()));
					r.save();
				}
			}
			userLoggedIn.save();
		}
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result userLogOut() {
		DynamicForm requestData = Form.form().bindFromRequest();
		// if (requestData.get("LogOutButton") != null) {
		userLoggedIn = null;
		recipe = null;

		// }
		// if (requestData.get("HomeButton") != null) {
		// recipe = null;
		// if (userLoggedIn.getRole() == "administrator")
		// return administratorView();
		// else
		// return ok(chooseView.render(userLoggedIn));
		// }
		if (requestData.get("AdminLog") != null) {
			return viewAdministratorLog();
		}
		return index();
	}

	public static Result administratorGraph() {
		return ok(administratorGraph.render());
	}

	public static Result displayGraph() {
		Script.export("win");
		return ok(administratorGraph.render());
	}

}
