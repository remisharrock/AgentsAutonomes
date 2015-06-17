package messages;

import java.io.Serializable;

import models.Field;
import models.RecipeAkka;

public class AllMessages {

	public static class MessageEnvelope {
		// we have to send the recipe with the message to know who are the
		// actors that are in the recipe
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

	public static class EnterRoomMessage extends MessageEnvelope implements Serializable {
		private static final long serialVersionUID = 1L;
		private Boolean changeState;

		public EnterRoomMessage(Boolean changeState) {
			this.changeState = changeState;
		}

		public EnterRoomMessage(RecipeAkka recipeAkka) {
			super(recipeAkka);
		}

		public Boolean getChangeState() {
			return changeState;
		}

	}

	public static class ExitRoomMessage extends MessageEnvelope implements Serializable {
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

	public static class DetectionOnMessage extends MessageEnvelope implements Serializable {
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

	public static class DetectionOffMessage extends MessageEnvelope implements Serializable {
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

	public static class TurnOnLampMessage extends MessageEnvelope implements Serializable {
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

	public static class TurnOffLampMessage extends MessageEnvelope implements Serializable {
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

	public static class PresenceTriggerMessage extends MessageEnvelope implements Serializable {
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

	public static class NonPresenceTriggerMessage extends MessageEnvelope implements Serializable {
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
}
