import java.util.List;

import models.Action;
import models.Channel;
import models.Trigger;
import play.Application;
import play.GlobalSettings;
import play.Logger;

import com.avaje.ebean.Ebean;

public class Global extends GlobalSettings {

	public void onStart(Application app) {
		System.out.println(Ebean.find(Channel.class).findRowCount());
//		if (Ebean.find(Channel.class).findRowCount() != 0) {
			
		List<Trigger> triggersList = Ebean.find(Trigger.class).findList();
//		triggersList.removeAll(triggersList);
		for (Trigger t : triggersList) {
			System.out.println(t.name);
			t.delete();
		}
		
		List<Action> actionsList = Ebean.find(Action.class).findList();
//		triggersList.removeAll(actionsList);
		for (Action a : actionsList) {
			System.out.println(a.name);
			a.delete();
		}
		
			List<Channel> channelsList = Ebean.find(Channel.class).findList();
//			channelsList.removeAll(channelsList);
			for (Channel c : channelsList) {
				System.out.println(c);
				c.delete();
			}
			

			Logger.info("Init Data");
			
			//HUMAN CHANNEL
			Channel human = new Channel("Human","Can enter or exit room");
			human.save();
			
			Action humanEnterRoomAction = new Action("Enter room");
			human.actions.add(humanEnterRoomAction);
			humanEnterRoomAction.channel = human;
			humanEnterRoomAction.save();
			
			Action humanExitRoomAction = new Action("Exit room");
			human.actions.add(humanExitRoomAction);
			humanExitRoomAction.channel = human;
			humanExitRoomAction.save();
			
			
			human.save();
			
			//PRESENCE DETECTOR CHANNEL
	    	Channel detector = new Channel("Detector", "Detects humans");
	    	detector.save();
	    	
	    	
	    	Trigger detectorTrigger1 = new Trigger("Presence Trigger", "Trigger description");
	    	detector.triggers.add(detectorTrigger1);
	    	
	    	detectorTrigger1.save();
	    	detectorTrigger1.channel = detector;
	    	
	    	
	    	Trigger detectorTrigger2 = new Trigger("Non presence Trigger");
	    	detector.triggers.add(detectorTrigger2);
	    	detectorTrigger2.channel = detector;
	    	detectorTrigger2.save();
	    	
	    	detector.save();
	    	
	    	
	    	//LAMP CHANNEL
	    	Channel lamp = new Channel("Lamp", "I am a Lamp");
	    	lamp.save();
	    	
	    	Action lampAction1 = new Action("Turn on lamp");
	    	lamp.actions.add(lampAction1);
	    	lampAction1.channel = lamp;
	    	lampAction1.save();
	    	
	    	Action lampAction2 = new Action("Turn off lamp");
	    	lamp.actions.add(lampAction2);
	    	lampAction2.channel = lamp;
	    	lampAction2.save();
	    	
	    	lamp.save();
	    	

//		} else {
//			List<Channel> channelsList = Ebean.find(Channel.class).findList();
//			for (Channel c : channelsList) {
//				System.out.println(c);
//			}
//		}
	}

	public void onStop(Application app) {
		Logger.info("Application shutdown...");
		
	}
}