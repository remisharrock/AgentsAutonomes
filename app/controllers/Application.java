package controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.avaje.ebean.Ebean;

import messages.AllMessages;
import models.Action;
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
import views.html.index;
import actors.AllActors;
import views.html.*;

public class Application extends Controller {

	private static User userLoggedIn = null;

	public static User getUserLoggedIn() {
		return userLoggedIn;
	}

	private static Recipe recipe;

	public static Result index() {
		return ok(index.render());
	}

	public static Result loginForm() {

		// if (userLoggedIn != null) {
		// if (userLoggedIn.getRole() == "administrator")
		// return administratorView();
		// else
		// return ok(chooseView.render(userLoggedIn));
		// }
		//
		// DynamicForm requestData = Form.form().bindFromRequest();
		//
		// String username = requestData.get("username");
		// String password = requestData.get("password");
		//
		// User user = User.authenticate(username, password);
		// if (user == null) {
		// return ok(index.render());
		// }
		//
		// else {
		// userLoggedIn = user;
		// System.out.println("MY USER:" + user);
		// if (userLoggedIn.getRole().equals("administrator")) {
		//
		// List<Channel> channelsList = Channel.getAllChannels();
		// System.out.println("Im here");
		// return ok(administratorView.render(channelsList));
		// } else {
		// System.out.println("Im not here");
		// return ok(chooseView.render(userLoggedIn));
		//
		// }
		//
		// }
		return ok();
	}

	public static Result administratorView() {
		// List<Channel> channelsList = Channel.getAllChannels();
		// return ok(administratorView.render(channelsList));
		return ok();
	}

	public static Result chooseView() {

		// DynamicForm requestData = Form.form().bindFromRequest();
		//
		// if (requestData.get("viewRecipesButton") != null) {
		// System.out.println("VIEW RECIPES");
		// return ok(viewRecipes.render(userLoggedIn));
		// } else {
		// recipe = new Recipe();
		// recipe.setUser(userLoggedIn);
		// List<Channel> channelsList = Channel.getAllChannels();
		// return ok(chooseTriggerChannel.render(channelsList));
		// }
		return ok();
	}

	public static Result viewAdministratorLog() {
		// ArrayList<String> logs = new ArrayList<String>();
		// logs.add("test0");
		// logs.add("test1");
		// logs.add("test2");
		// return ok(administratorLog.render(logs));
		return ok();
	}

	public static Result submitForm() throws IOException {
		// List<Channel> channelsList = Channel.getAllChannels();
		// return ok(chooseTriggerChannel.render(channelsList));
		return ok();
	}

	public static Result chooseTrigger(Long channelId) {
		// Channel channel = Channel.find.byId(channelId);
		// recipe.setTriggerChannel(channel);
		// channel.save();
		// return ok(chooseTrigger.render(channel));
		return ok();
	}

	public static Result completeTriggerFields(Long triggerId) {

		// Trigger trigger = Trigger.find.byId(triggerId);
		// recipe.setTrigger(trigger);
		// DynamicForm requestData = Form.form().bindFromRequest();
		// System.out.println("My trigger: " + trigger.getName());
		//
		// // HashMap<Field, String> triggerFields = new HashMap<Field,
		// String>();
		// // for (Field f : trigger.getFields()) {
		// // triggerFields.put(f, requestData.get(f.getName()));
		// // }
		//
		// String fieldName = trigger.getFieldName();
		// if (fieldName != null && !fieldName.equals("")) {
		// String triggerFieldValue = requestData.get(fieldName);
		// Field f = new Field(fieldName, triggerFieldValue);
		// recipe.setTriggerField(f);
		// }
		//
		// return ok(completeTriggerFields.render(trigger));
		return ok();
	}

	public static Result chooseActionChannel() {
		// List<Channel> channelsList = Channel.getAllChannels();
		// return ok(chooseActionChannel.render(channelsList));
		return ok();
	}

	public static Result chooseAction(Long channelId) {
		// Channel channel = Channel.find.byId(channelId);
		// recipe.setActionChannel(channel);
		// channel.save();
		//
		// return ok(chooseAction.render(channel));
		return ok();
	}

	public static Result completeActionFields(Long actionId) {

		// Action action = Action.find.byId(actionId);
		//
		// DynamicForm requestData = Form.form().bindFromRequest();
		//
		// recipe.setAction(action);
		// // HashMap<Field, String> actionFields = new HashMap<Field,
		// String>();
		// // for (Field f : action.getFields()) {
		// // actionFields.put(f, requestData.get(f.getName()));
		// // }
		//
		// String fieldName = action.getFieldName();
		// if (fieldName != null && !fieldName.equals("")) {
		// String actionFieldValue = requestData.get(fieldName);
		// Field f = new Field(fieldName, actionFieldValue);
		// recipe.setActionField(f);
		// }
		//
		// return ok(completeActionFields.render(action));
		return ok();
	}

	public static Result createRecipe() {
		// return ok(createRecipe.render(recipe));
		return ok();
	}

	public static Result viewRecipesAfterCreate() {
		// DynamicForm requestData = Form.form().bindFromRequest();
		//
		// return ok(viewRecipes.render(userLoggedIn));
		return ok();
	}

	public static Result viewRecipes() {
		// // NOT BEING USED
		// return ok(viewRecipes.render(userLoggedIn));
		return ok();
	}

	public static Result activateTrigger(Long triggerId) {

		// List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
		//
		// for (int i = 0; i < recipesList.size(); i++) {
		// if (recipesList.get(i).getTriggerChannel().getId() == triggerId) {
		// Trigger trigger = null;
		// for (int j = 0; j <
		// recipesList.get(i).getTriggerChannel().getTriggers().size(); j++) {
		// if
		// (recipesList.get(i).getTriggerChannel().getTriggers().get(j).getId()
		// == triggerId) {
		// trigger =
		// recipesList.get(i).getTriggerChannel().getTriggers().get(j);
		// }
		// }
		// }
		// }

		return ok();
	}

	public static Result chooseActivationType() {

		// DynamicForm requestData = Form.form().bindFromRequest();
		//
		// List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
		//
		// Long triggerId =
		// Long.parseLong(requestData.get("trigger_chosen_to_activate_id"));
		//
		// if (requestData.get("activateTriggerManuallyButton") != null) {
		// return ok(administratorActivateManually.render(triggerId));
		// } else if (requestData.get("activateTriggerPeriodicallyButton") !=
		// null) {
		// return ok(administratorActivatePeriodically.render(triggerId));
		// } else
		// return ok(administratorActivateRandomly.render(triggerId));
		return ok();
	}

	public static Result viewRecipeLog() {
		// DynamicForm requestData = Form.form().bindFromRequest();
		// if (userLoggedIn != null && requestData.get("viewRecipesLog") !=
		// null) {
		// long recipeId = Long.parseLong(requestData.get("viewRecipesLog"));
		// Recipe r = userLoggedIn.getRecipesById(recipeId);
		// return ok(viewRecipeLog.render(userLoggedIn, r));
		// } else
		// return ok(index.render());
		return ok();
	}

	public static Result activateRecipe() {
		// DynamicForm requestData = Form.form().bindFromRequest();
		// if (userLoggedIn != null) {
		// if (requestData.get("RecipeOff") != null) {
		// long recipeId = Long.parseLong(requestData.get("RecipeOff"));
		// Recipe r = userLoggedIn.getRecipesById(recipeId);
		// if (r.getActive()) {
		// r.setActive(false);
		// r.getLog().add(new Log("Recipe turned off."));
		// r.save();
		// }
		// } else if (requestData.get("RecipeOn") != null) {
		// long recipeId = Long.parseLong(requestData.get("RecipeOn"));
		// Recipe r = userLoggedIn.getRecipesById(recipeId);
		// if (r.getActive() == false) {
		// r.setActive(true);
		// r.getLog().add(new Log("Recipe turned on."));
		// r.save();
		// }
		// }
		// userLoggedIn.save();
		// }
		// return ok(viewRecipes.render(userLoggedIn));
		return ok();
	}

	public static Result userLogOut() {
		// DynamicForm requestData = Form.form().bindFromRequest();
		// // if (requestData.get("LogOutButton") != null) {
		// userLoggedIn = null;
		// recipe = null;
		//
		// if (requestData.get("AdminLog") != null) {
		// return viewAdministratorLog();
		// }
		// return index();
		return ok();
	}

}
