package actors;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;

import controllers.Scheduler;
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

	public final static ActorSystem system = ActorSystem.create("helloakka");

	// public final static ActorRef humanActor =
	// system.actorOf(Props.create(HumanActor.class), "human");
	// public final static ActorRef detectorActor =
	// system.actorOf(Props.create(DetectorActor.class), "detector");
	// public final static ActorRef lampActor =
	// system.actorOf(Props.create(LampActor.class), "lamp");
	// public final static ActorRef luminosityDetectorActor =
	// system.actorOf(Props.create(LuminosityDetectorActor.class),
	// "luminosityDetector");
	
	public static <T, E> T getKeyByValue(Map<T, E> map, E value) {
		for (Entry<T, E> entry : map.entrySet()) {
			if (Objects.equals(value, entry.getValue())) {
				return entry.getKey();
			}
		}
		return null;
	}
	

	public static void writeToLog(RecipeAkka ra, String state) {
		Long recipeId = getKeyByValue(RecipeAkka.recipesMap, ra);
		Recipe r = Recipe.getRecipeById(recipeId);
		AdminLog log = new AdminLog(ra.getTitle(), r.getTriggerChannel()
				.getName(), r.getTrigger().getName(), r.getActionChannel()
				.getName(), r.getAction().getName(), state, ra.getUser(),
				new Date());
		log.save();
	}

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
			System.out.println(AllMessages.getMapClassNameMessage()
					.containsValue(message));
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

	/*
	 * this hashmap will be used to get the .class of the class from the class
	 * name when creating the recipe, we only have the class name of the actor
	 * that we want to work with, but it will be difficult for us to get the
	 * .class So this hashmap will return the .class by simply giving the
	 * classname
	 * 
	 * !! The downside is that this map has to be filled manually
	 */
	private static final HashMap<String, Class<?>> mapClassNameActor;
	static {
		mapClassNameActor = new HashMap<String, Class<?>>();
		mapClassNameActor.put("HumanActor", HumanActor.class);
		mapClassNameActor.put("DetectorActor", DetectorActor.class);
		mapClassNameActor.put("LampActor", LampActor.class);
		mapClassNameActor.put("TemperatureDetectorActor", TemperatureDetectorActor.class);
		mapClassNameActor.put("AirConditionerActor", AirConditionerActor.class);
	}

	public static HashMap<String, Class<?>> getMapClassNameActor() {
		return mapClassNameActor;
	}
}
