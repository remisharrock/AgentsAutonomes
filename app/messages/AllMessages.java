package messages;

import java.io.Serializable;
import java.util.HashMap;

import actors.AllActors.DetectorActor;
import actors.AllActors.HumanActor;
import actors.AllActors.LampActor;
import actors.AllActors.LuminosityDetectorActor;

public final class AllMessages {
	
	private AllMessages() {
	}
	
	public class EnterRoomMessage implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public EnterRoomMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		public Boolean getChangeState() {
			return changeState;
		}
		
	}
    public class ExitRoomMessage implements Serializable {
    	private static final long serialVersionUID = 1L;
    	private Boolean changeState;
		public ExitRoomMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
    }
    
	public class DetectionOnMessage implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public DetectionOnMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
		
	}
    public static class DetectionOffMessage implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public DetectionOffMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public static class TurnOnLampMessage implements Serializable {
    	private static final long serialVersionUID = 1L;
    	private Boolean changeState;
    	public TurnOnLampMessage(Boolean changeState) {
			this.changeState = changeState;
		}
    	
    	public Boolean getChangeState() {
			return changeState;
		}
    }
    
    public static class TurnOffLampMessage implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public TurnOffLampMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public class PresenceTriggerMessage implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public PresenceTriggerMessage(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public class NonPresenceTriggerMessage implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
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
