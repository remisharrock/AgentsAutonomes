package controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.avaje.ebean.Ebean;

import messages.AllMessages;
import models.Action;
import models.Channel;
import models.Field;
import models.Recipe;
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

	public static String turnOnCheckbox = "";
	public static String turnOffCheckbox = "";

	private static User userLoggedIn;

	private static Recipe recipe;

	public static Result index() {
		return ok(index.render());
	}

	public static Result loginForm() {

		DynamicForm requestData = Form.form().bindFromRequest();

		String username = requestData.get("username");
		String password = requestData.get("password");

		User user = User.authenticate(username, password);
		if (user == null) {
			return ok(index.render());
		}

		else {
			userLoggedIn = user;
			if (userLoggedIn.getRole() == "administrator") {

				List<Channel> channelsList = Channel.getAllChannels();
				HashMap<Channel, List<Trigger>> triggersDic = new HashMap<Channel, List<Trigger>>();
				for (int i = 0; i < channelsList.size(); i++) {
					triggersDic.put(channelsList.get(i), channelsList.get(i).getTriggers());
				}

				return ok(administratorView.render(channelsList, triggersDic));
			} else {
				recipe = new Recipe();
				recipe.setUser(userLoggedIn);
				recipe.save();
				return ok(chooseView.render(userLoggedIn));

			}

		}

	}

	public static Result chooseView() {

		DynamicForm requestData = Form.form().bindFromRequest();

		if (requestData.get("viewRecipesButton") != null) {
			return ok(viewRecipes.render(userLoggedIn));
		} else {
			List<Channel> channelsList = Channel.getAllChannels();
			return ok(chooseTriggerChannel.render(channelsList));
		}

	}
	
	public static Result viewAdministratorLog(){
		return ok(administratorLog.render());
	}

	public static Result submitForm() throws IOException {
		Boolean lampOn = false;

		DynamicForm requestData = Form.form().bindFromRequest();

		turnOnCheckbox = requestData.get("turnOnCheckbox");
		turnOffCheckbox = requestData.get("turnOffCheckbox");

		System.out.println("turn off checkbox: " + turnOffCheckbox);

		if (requestData.get("enterRoomButton") != null) {
			// Tell the detector that a human entered the room
			if (turnOnCheckbox != null) {
				AllActors.detector.tell(new AllMessages.EnterRoom(true), AllActors.human);
			} else {
				AllActors.detector.tell(new AllMessages.EnterRoom(false), AllActors.human);
			}

			try {
				TimeUnit.MILLISECONDS.sleep(10);
			} catch (InterruptedException e) {
				
				e.printStackTrace();
			}

			if (AllActors.Lamp.state.equals("ON"))
				lampOn = true;
			else
				lampOn = false;
			System.out.println("Enter room button - LampOn is TRUE");

		} else if (requestData.get("exitRoomButton") != null) {
			// Tell the detector that a human exited the room
			if (turnOffCheckbox != null) {
				AllActors.detector.tell(new AllMessages.ExitRoom(true), AllActors.human);
			} else {
				AllActors.detector.tell(new AllMessages.ExitRoom(false), AllActors.human);
			}

			try {
				TimeUnit.MILLISECONDS.sleep(10);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (AllActors.Lamp.state.equals("OFF"))
				lampOn = false;
			else
				lampOn = true;

			System.out.println("Exit room button - LampOn is FALSE");
		}

		List<Channel> channelsList = Channel.getAllChannels();
		return ok(chooseTriggerChannel.render(channelsList));
	}

	public static Result chooseTrigger(Long channelId) {

		Channel channel = Channel.find.byId(channelId);

		recipe.setTriggerChannel(channel);

		return ok(chooseTrigger.render(channel));
	}

	public static Result completeTriggerFields(Long triggerId) {

		Trigger trigger = Trigger.find.byId(triggerId);

		DynamicForm requestData = Form.form().bindFromRequest();

		HashMap<Field, String> triggerFields = new HashMap<Field, String>();
		for (Field f : trigger.getFields()) {
			triggerFields.put(f, requestData.get(f.getName()));
		}

		recipe.setTriggersMap(triggerFields);

		return ok(completeTriggerFields.render(trigger));
	}

	public static Result chooseActionChannel() {
		List<Channel> channelsList = Channel.getAllChannels();
		return ok(chooseActionChannel.render(channelsList));
	}

	public static Result chooseAction(Long channelId) {
		Channel channel = Channel.find.byId(channelId);

		recipe.setActionChannel(channel);

		return ok(chooseAction.render(channel));
	}

	public static Result completeActionFields(Long actionId) {

		Action action = Action.find.byId(actionId);

		DynamicForm requestData = Form.form().bindFromRequest();

		HashMap<Field, String> actionFields = new HashMap<Field, String>();
		for (Field f : action.getFields()) {
			actionFields.put(f, requestData.get(f.getName()));
		}

		recipe.setActionsMap(actionFields);

		return ok(completeActionFields.render(action));
	}

	public static Result createRecipe() {
		return ok(createRecipe.render(recipe));
	}

	public static Result viewRecipesAfterCreate() {
		DynamicForm requestData = Form.form().bindFromRequest();

		recipe.setTitle(requestData.get("recipeTitle"));
		recipe.setActive(true);
		recipe.save();
		List<Recipe> list = userLoggedIn.getRecipes();
		list.add(recipe);
		System.out.println("RECIPEEEEES:" + list.size());
		userLoggedIn.setRecipes(list);
		userLoggedIn.save();
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result viewRecipes() {
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result activateTrigger(Long triggerId) {
		List<Recipe>  recipesList = Ebean.find(Recipe.class).findList();
		
		for (int i=0; i<recipesList.size(); i++){
			if (recipesList.get(i).getTriggerChannel().getId() == triggerId){
				Trigger trigger = null;
				for (int j=0; j<recipesList.get(i).getTriggerChannel().getTriggers().size(); j++){
					if (recipesList.get(i).getTriggerChannel().getTriggers().get(j).getId() == triggerId){
						trigger = recipesList.get(i).getTriggerChannel().getTriggers().get(j);
					}
				}
//				@SuppressWarnings("rawtypes")
//				Class classe = trigger.getClass();
//				try {
//					recipesList.get(i).getActionChannel().getActorRef().tell(classe.newInstance(), recipesList.get(i).getTriggerChannel().getActorRef());
//				} catch (InstantiationException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				} catch (IllegalAccessException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
			}
		}
		
		return ok();
	}

}
