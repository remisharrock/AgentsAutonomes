package messages;

import java.io.Serializable;
import java.util.HashMap;

import models.Field;
import models.RecipeAkka;
import models.RecipeAkka;
import actors.AllActors.DetectorActor;
import actors.AllActors.HumanActor;
import actors.AllActors.LampActor;

public class AllMessages {
	private static AllMessages instance = null;
	private AllMessages() {
	}
	
	public static AllMessages getInstance() {
		if (instance == null) {
			return new AllMessages();
		}
		
		return instance;
	}
	
	public static enum MessageType {
		Trigger, Action
	} 
	
	
	public class MessageEnvelope {
		// we have to send the recipeAkka with the message to know who are the actors that are in the recipeAkka
		private RecipeAkka recipeAkka;
		public MessageEnvelope() {
		}
		
		public MessageEnvelope(RecipeAkka recipeAkka) {
			this.recipeAkka = recipeAkka;
		}

		public void setRecipeAkka(RecipeAkka recipeAkka) {
			this.recipeAkka = recipeAkka;
		}

		public RecipeAkka getRecipeAkka() {
			return this.recipeAkka;
		}
	}
	
	public class EnterRoomMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Trigger;
		public MessageType getMessageType() {
			return type;
		}
		public EnterRoomMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    public class ExitRoomMessage extends MessageEnvelope implements Serializable {
    	private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Trigger;
		public MessageType getMessageType() {
			return type;
		}
		public ExitRoomMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
    }
    
	public class DetectionOnMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Trigger;
		public MessageType getMessageType() {
			return type;
		}
		public DetectionOnMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    public class DetectionOffMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		public DetectionOffMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    
    public class TurnOnLampMessage extends MessageEnvelope implements Serializable {
    	private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Action;
		public MessageType getMessageType() {
			return type;
		}
    	public TurnOnLampMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
    }
    
    public class TurnOffLampMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Action;
		public MessageType getMessageType() {
			return type;
		}
		public TurnOffLampMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    
    public class HotTemperatureMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Trigger;
		public MessageType getMessageType() {
			return type;
		}
		public HotTemperatureMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    
    public class ColdTemperatureMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Trigger;
		public MessageType getMessageType() {
			return type;
		}
		public ColdTemperatureMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    
    public class TurnOnHeaterMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Action;
		public MessageType getMessageType() {
			return type;
		}
		public TurnOnHeaterMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    
    public class TurnOnCoolerMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private MessageType type = MessageType.Action;
		public MessageType getMessageType() {
			return type;
		}
		public TurnOnCoolerMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
	}
    
    
//    public class PresenceTriggerMessage extends MessageEnvelope implements Serializable {
//		private static final long serialVersionUID = 1L;
//		private Boolean changeState;
//		
//		public PresenceTriggerMessage(RecipeAkka recipeAkka) {
//			super(recipeAkka);
//		}
//		
//		public PresenceTriggerMessage() {
//			super();
//		}
//		
//		public Boolean getChangeState() {
//			return changeState;
//		}
//	}
//    
//    public class NonPresenceTriggerMessage extends MessageEnvelope implements Serializable {
//		private static final long serialVersionUID = 1L;
//		private Boolean changeState;
//		
//		public NonPresenceTriggerMessage(RecipeAkka recipeAkka) {
//			super(recipeAkka);
//		}
//		
//		public NonPresenceTriggerMessage(Boolean changeState) {
//			this.changeState = changeState;
//		}
//		
//		public Boolean getChangeState() {
//			return changeState;
//		}
//	}
    
	private static final HashMap<String, Class<?>> mapClassNameMessage;
	static
    {
		mapClassNameMessage = new HashMap<String, Class<?>>();
		mapClassNameMessage.put("EnterRoomMessage", EnterRoomMessage.class);
		mapClassNameMessage.put("ExitRoomMessage", ExitRoomMessage.class);
		mapClassNameMessage.put("DetectionOnMessage", DetectionOnMessage.class);
		mapClassNameMessage.put("DetectionOffMessage", DetectionOffMessage.class);
		mapClassNameMessage.put("TurnOnLampMessage", TurnOnLampMessage.class);
		mapClassNameMessage.put("TurnOffLampMessage", TurnOffLampMessage.class);
		mapClassNameMessage.put("HotTemperatureMessage", HotTemperatureMessage.class);
		mapClassNameMessage.put("ColdTemperatureMessage", ColdTemperatureMessage.class);
		mapClassNameMessage.put("TurnOnHeaterMessage", TurnOnHeaterMessage.class);
		mapClassNameMessage.put("TurnOnCoolerMessage", TurnOnCoolerMessage.class);
    }
	
	public static HashMap<String, Class<?>> getMapClassNameMessage(){
		return mapClassNameMessage;
	}
}
