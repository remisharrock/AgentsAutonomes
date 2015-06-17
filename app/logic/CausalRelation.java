package logic;

import java.util.ArrayList;
import java.util.List;
import java.util.function.UnaryOperator;

import akka.actor.ActorRef;

/**
 * We let attributes of a relation be accessed and mutated then it adds some
 * extra flexibility : you can tune your causal relation on the fly.
 */
public class CausalRelation {
	private ActorRef triggerActor;
	private Class<?> triggerMessageClass;
	private String description;
	private ActorRef actionActor;
	private UnaryOperator<Object> mapper;
	private List<String> label;

	public CausalRelation(ActorRef triggerActor, Class<?> triggerMessageClass, String description,
			ActorRef actionActor, UnaryOperator<Object> mapper, List<String> label) {
		this.actionActor = actionActor;
		this.description = description;
		this.label = label;
		this.mapper = mapper;
		this.triggerActor = triggerActor;
		this.triggerMessageClass = triggerMessageClass;
	}

	public ActorRef getTriggerActor() {
		return triggerActor;
	}

	public void setTriggerActor(ActorRef triggerActor) {
		this.triggerActor = triggerActor;
	}

	public Class<?> getTriggerMessageClass() {
		return triggerMessageClass;
	}

	public void setTriggerMessageClass(Class<?> triggerMessageClass) {
		this.triggerMessageClass = triggerMessageClass;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ActorRef getActionActor() {
		return actionActor;
	}

	public void setActionActor(ActorRef actionActor) {
		this.actionActor = actionActor;
	}

	public UnaryOperator<Object> getMapper() {
		return mapper;
	}

	public void setMapper(UnaryOperator<Object> mapper) {
		this.mapper = mapper;
	}

	public List<String> getLabel() {
		return label;
	}

	public void setLabel(ArrayList<String> label) {
		this.label = label;
	}
}
