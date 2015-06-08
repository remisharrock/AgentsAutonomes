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
	private static Recipe recipe; //used only for dynamic creation 

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
                Recipe r = new Recipe();
				r.setTitle("Default recipe");
				r.setActive(true);
				r.getLog().add("Recipe created.");
				r.getLog().add("Recipe activated on creation.");
				r.setUser(userLoggedIn);
				r.save();
				//userLoggedIn.getRecipes().add(r); // se scommentato ne salva due ! e non salva il log
				userLoggedIn.save();
				/*
				Recipe recipe2 = new Recipe();
				recipe2.setTitle("Second recipe");
				recipe2.setId(2);
				recipe2.setUser(userLoggedIn);
				recipe2.setActive(true);
				recipe2.getLog().add("Recipe created.");
				recipe2.getLog().add("Recipe activated on creation.");
				recipe2.save();*/
                 
				return ok(chooseView.render(userLoggedIn));
			}

		}

	}

	public static Result administratorView() {
		List<Channel> channelsList = Channel.getAllChannels();
		HashMap<Channel, List<Trigger>> triggersDic = new HashMap<Channel, List<Trigger>>();
		for (int i = 0; i < channelsList.size(); i++) {
			triggersDic.put(channelsList.get(i), channelsList.get(i).getTriggers());
		}
		return ok(administratorView.render(channelsList, triggersDic));
	}

	public static Result chooseView() {

		DynamicForm requestData = Form.form().bindFromRequest();

		if (requestData.get("viewRecipesButton") != null) {
			return ok(viewRecipes.render(userLoggedIn));
		} else {
			List<Channel> channelsList = Channel.getAllChannels();
			recipe = new Recipe();
			return ok(chooseTriggerChannel.render(channelsList));
		}

	}

	public static Result viewAdministratorLog() {
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
		recipe.getLog().add("Recipe created.");
		recipe.getLog().add("Recipe activated on creation.");
		
		// List<Recipe> list = userLoggedIn.getRecipes();
		// list.add(recipe);
		// System.out.println("RECIPEEEEES:" + list.size());
		// userLoggedIn.setRecipes(list)
		//(userLoggedIn.getRecipes().add(recipe);
		recipe.setUser(userLoggedIn);
		recipe.save();
		//userLoggedIn.getRecipes().add(recipe); //se scommentato ne aggiunge 2
		userLoggedIn.save();
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result viewRecipes() {
		if (userLoggedIn != null)
			return ok(viewRecipes.render(userLoggedIn));
		else
			return ok(index.render());
	}

	public static Result activateTrigger(Long triggerId) {

		Ebean.find(Recipe.class)
				.findList()
				.parallelStream()
				/* Now we have a stream, we filter on the id of TriggerChannel */
				.filter(recipe -> recipe.getTriggerChannel().getId() == triggerId)
				/* And now we send a message to each channel */
				.forEach(
						recipe -> {
							/* This actor is the object which will be told */
							try {
								recipe.getActionChannel()
										.getActorRef()
										.tell(
										/*
										 * Message to be told: we send the
										 * message of the first trigger found
										 */
										recipe.getTriggerChannel().getTriggers().stream()
												.filter(trigger -> trigger.getId() == triggerId).reduce((x, y) -> x)
												.getClass().newInstance(),
										/* Sender */
										recipe.getTriggerChannel().getActorRef());
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						});

		return ok();
	}

	public static Result viewRecipeLog() {
		DynamicForm requestData = Form.form().bindFromRequest();
		if (userLoggedIn != null && requestData.get("viewRecipesLog") != null){
				long recipeId = Long.parseLong( requestData.get("viewRecipesLog") );
				Recipe r = userLoggedIn.getRecipesById(recipeId);
				return ok(viewRecipeLog.render(userLoggedIn, r));
		}
		else
			return ok(index.render());
	}

	public static Result activateRecipe() {
		DynamicForm requestData = Form.form().bindFromRequest();
		if (userLoggedIn != null){
			if (requestData.get("RecipeOff") != null) {	
				long recipeId = Long.parseLong( requestData.get("RecipeOff") );
				Recipe r = userLoggedIn.getRecipesById(recipeId);
				if(r.getActive()){
					r.setActive(false);
					r.getLog().add("Recipe turned off.");
					r.save();
				}
			}else if (requestData.get("RecipeOn") != null) {	
				long recipeId = Long.parseLong( requestData.get("RecipeOn") );
				Recipe r = userLoggedIn.getRecipesById(recipeId);
				if(r.getActive()==false){
					r.setActive(true);
					r.getLog().add("Recipe turned on.");
					r.save();
				}
			}
			userLoggedIn.save();
		}
		return ok(viewRecipes.render(userLoggedIn));
	}

	public static Result userLogOut() {
		DynamicForm requestData = Form.form().bindFromRequest();
		if (requestData.get("LogOutButton") != null) {
			userLoggedIn = null;
			recipe = null;
			return index();
		}
		if (requestData.get("HomeButton") != null) {
			recipe = null;
			if (userLoggedIn.getRole() == "administrator")
				return administratorView();
			else
				return ok(chooseView.render(userLoggedIn));
		} 
		if(requestData.get("AdminLog") != null){
			return viewAdministratorLog();
		}	
		else
			return index();
	}

}
