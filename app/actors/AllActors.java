package actors;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;

import main.Scheduler;
import messages.AllMessages;
import messages.AllMessages.DetectionOffMessage;
import messages.AllMessages.MessageEnvelope;
import models.AdminLog;
import models.Field;
import models.Recipe;
import models.RecipeAkka;
import akka.actor.ActorSystem;
import akka.actor.UntypedActor;

public class AllActors {

	/**
	 * Akka Doc: 
	 * An actor system is a hierarchical group of actors which share common configuration, 
	 * e.g. dispatchers, deployments, remote capabilities and addresses. 
	 * It is also the entry point for creating or looking up actors.
	 * 
	 * AgentsAutonomes Doc:
	 * This actor system will be used to create all the necessary actors
	 * and manage the already existing ones
	 */
	public final static ActorSystem system = ActorSystem.create("helloakka");

	public static <T, E> T getKeyByValue(Map<T, E> map, E value) {
		for (Entry<T, E> entry : map.entrySet()) {
			if (Objects.equals(value, entry.getValue())) {
				return entry.getKey();
			}
		}
		return null;
	}
	

	/**
	 * This functions writes everything that happened (sent messages...)
	 * on the admin log
	 * @param ra
	 * @param state
	 */
	public static void writeToLog(RecipeAkka ra, String state) {
		Long recipeId = getKeyByValue(RecipeAkka.recipesMap, ra);
		Recipe r = Recipe.getRecipeById(recipeId);
		AdminLog log = new AdminLog(ra.getTitle(), r.getTriggerChannel()
				.getName(), r.getTrigger().getName(), r.getActionChannel()
				.getName(), r.getAction().getName(), state, ra.getUser(),
				new Date(), ra.getUser().getUserGroup());
		log.save();
	}

	/**
	 * The actor router is a smart router. His goal is to take the trigger message of a recipe
	 * and to transfer the action to the required actor.
	 * To simulate a true system, each group of users (or UserGroup) have one actor router
	 */
	/**
	 * For 1 UserGroup:
	 * One Channel has one and only one actor
	 * Ex: in a house, there is a temperature detector, and all the users 
	 * that belong to this house (or this UserGroup) will see this temperature detector
	 * This is the optimal way to simulate houses and group of users
	 *
	 */
	public static class ActorRouter extends UntypedActor {
		String userGroup = "";

		public ActorRouter() {

		}

		public ActorRouter(String userGroup) {
			this.userGroup = userGroup;
		}

		public void setUserGroup(String userGroup) {
			this.userGroup = userGroup;
		}

		@Override
		public void onReceive(Object message) throws Exception {
			System.out.println("class: " + message);
			MessageEnvelope me = (MessageEnvelope) message;
			RecipeAkka ra = me.getRecipeAkka();
			ra.getActionChannelActor().tell(ra.getActionMessage(), getSelf());
		}
		

	}

	public static class HumanActor extends UntypedActor {
		public String state = "";
		// This constructor is necessary
		public HumanActor() {
		}

		public void onReceive(Object message) {
			MessageEnvelope msg = (MessageEnvelope) message;
			Field field = msg.getRecipeAkka().getActionField();
			if (message instanceof AllMessages.ExitRoomMessage) {
				state = "Exited room";
				if (field != null) {
					 state +=" / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				} else {
					System.out.println("trigger field IS null");
				}
			} else if (message instanceof AllMessages.EnterRoomMessage) {
				state = "Entered room";
				if (field != null) {
					 state += " / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			}
			
			writeToLog(msg.getRecipeAkka(), state);
		}
	}

	public static class DetectorActor extends UntypedActor {
		public String state = "";
		// This constructor is necessary
		public DetectorActor() {
		}

		public void onReceive(Object message) {
			MessageEnvelope msg = (MessageEnvelope) message;
			Field field = msg.getRecipeAkka().getActionField();
			if (message instanceof AllMessages.DetectionOffMessage) {
				state = "No Detection";
				if (field != null) {
					 state +=" / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				} else {
					System.out.println("trigger field IS null");
				}
			} else if (message instanceof AllMessages.DetectionOnMessage) {
				state = "Detection";
				if (field != null) {
					 state += " / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			}
			
			writeToLog(msg.getRecipeAkka(), state);
		}
	}


	public static class LampActor extends UntypedActor {
		public String state = "";
		// This constructor is necessary
		public LampActor() {
		}

		public void onReceive(Object message) {
			MessageEnvelope msg = (MessageEnvelope) message;
			Field field = msg.getRecipeAkka().getActionField();
			if (message instanceof AllMessages.TurnOffLampMessage) {
				state = "OFF";
				if (field != null) {
					 state +=" / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			} else if (message instanceof AllMessages.TurnOnLampMessage) {
				state = "ON";
				if (field != null) {
					 state += " / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			}
			
			writeToLog(msg.getRecipeAkka(), state);
		}
	}

	public static class TemperatureDetectorActor extends UntypedActor {
		public String state = "";
		// This constructor is necessary
		public TemperatureDetectorActor() {
		}

		public void onReceive(Object message) {
			MessageEnvelope msg = (MessageEnvelope) message;
			Field field = msg.getRecipeAkka().getActionField();
			if (message instanceof AllMessages.HotTemperatureMessage) {
				state = "Room is Hot";
				if (field != null) {
					 state +=" / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			} else if (message instanceof AllMessages.ColdTemperatureMessage) {
				state = "Room is Cold";
				if (field != null) {
					 state += " / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			}
			
			writeToLog(msg.getRecipeAkka(), state);
		}
	}
	
	public static class AirConditionerActor extends UntypedActor {
		public String state = "";
		// This constructor is necessary
		public AirConditionerActor() {
		}

		public void onReceive(Object message) {
			MessageEnvelope msg = (MessageEnvelope) message;
			Field field = msg.getRecipeAkka().getActionField();
			if (message instanceof AllMessages.TurnOnCoolerMessage) {
				state = "Turned on Cooler";
				if (field != null) {
					 state +=" / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			} else if (message instanceof AllMessages.TurnOnHeaterMessage) {
				state = "Turned on Heater";
				if (field != null) {
					 state += " / " + field.getName() + ": "
							+ field.getValue().toUpperCase();
				}
			}
			
			writeToLog(msg.getRecipeAkka(), state);
		}
	}

}
