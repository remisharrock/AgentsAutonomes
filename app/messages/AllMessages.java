package messages;

import java.io.Serializable;

public final class AllMessages {
	
	private AllMessages() {
	}
	
	public static class EnterRoom implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public EnterRoom(Boolean changeState) {
			this.changeState = changeState;
		}
		public Boolean getChangeState() {
			return changeState;
		}
		
	}
    public static class ExitRoom implements Serializable {
    	private static final long serialVersionUID = 1L;
    	private Boolean changeState;
		public ExitRoom(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
    }
    
	public static class DetectionOn implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		
		public DetectionOn(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
		
	}
    public static class DetectionOff implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public DetectionOff(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
    
    public static class TurnOnLamp implements Serializable {
    	private static final long serialVersionUID = 1L;
    	private Boolean changeState;
    	public TurnOnLamp(Boolean changeState) {
			this.changeState = changeState;
		}
    	
    	public Boolean getChangeState() {
			return changeState;
		}
    }
    public static class TurnOffLamp implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;
		public TurnOffLamp(Boolean changeState) {
			this.changeState = changeState;
		}
		
		public Boolean getChangeState() {
			return changeState;
		}
	}
}
