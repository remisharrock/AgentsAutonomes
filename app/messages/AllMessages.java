package messages;

import java.io.Serializable;
import java.util.HashMap;

import models.Field;
import models.RecipeAkka;
import models.RecipeAkka;
import actors.AllActors.DetectorActor;
import actors.AllActors.HumanActor;
import actors.AllActors.LampActor;
import actors.AllActors.LuminosityDetectorActor;

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
		
		private Field field;
		
		public MessageEnvelope() {
		}
		
		public MessageEnvelope(RecipeAkka recipeAkka) {
			this.recipeAkka = recipeAkka;
		}
		
		public Field getField() {
			return field;
		}

		public void setField(Field field) {
			this.field = field;
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
		private Boolean changeState;
		private MessageType type = MessageType.Trigger;
		
		public EnterRoomMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public EnterRoomMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
		
		public MessageType getMessageType() {
			return type;
		}
		
	}
    public class ExitRoomMessage extends MessageEnvelope implements Serializable {
    	private static final long serialVersionUID = 1L;
    	private Boolean changeState;
		
		public ExitRoomMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public ExitRoomMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
    }
    
	public class DetectionOnMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public DetectionOnMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public DetectionOnMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public DetectionOnMessage() {
			super();
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
		
	}
    public class DetectionOffMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public DetectionOffMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public DetectionOffMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public class TurnOnLampMessage extends MessageEnvelope implements Serializable {
    	private static final long serialVersionUID = 1L;
    	private Boolean changeState;
		
    	public TurnOnLampMessage(Boolean changeState) {
			this.changeState = changeState;
		}
    	
    	public TurnOnLampMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
    	
    	public Boolean getChangeState() {
			return changeState;
		}
    }
    
    public class TurnOffLampMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public TurnOffLampMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public TurnOffLampMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public class PresenceTriggerMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public PresenceTriggerMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public PresenceTriggerMessage() {
			super();
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public class NonPresenceTriggerMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public NonPresenceTriggerMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}
		
		public NonPresenceTriggerMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
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
		mapClassNameMessage.put("PresenceTriggerMessage", PresenceTriggerMessage.class);
		mapClassNameMessage.put("NonPresenceTriggerMessage", NonPresenceTriggerMessage.class);
    }
	
	public static HashMap<String, Class<?>> getMapClassNameMessage(){
		return mapClassNameMessage;
	}
}
