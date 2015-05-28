import java.util.ArrayList;
import java.util.List;

import models.Action;
import models.Channel;
import models.Field;
import models.Recipe;
import models.Trigger;
import models.User;
import play.Application;
import play.GlobalSettings;
import play.Logger;

import com.avaje.ebean.Ebean;

public class Global extends GlobalSettings {

	public void onStart(Application app) {
		System.out.println(Ebean.find(Channel.class).findRowCount());
//		if (Ebean.find(Channel.class).findRowCount() != 0) {
			
		
		List<Field> fieldsList = Ebean.find(Field.class).findList();
//		channelsList.removeAll(channelsList);
		for (Field f : fieldsList) {	
			
			System.out.println("EWWWWWWWWWWW" + f);
			f.delete();
		}
		
		List<Trigger> triggersList = Ebean.find(Trigger.class).findList();
//		triggersList.removeAll(triggersList);
		for (Trigger t : triggersList) {
			System.out.println(t.getName());
			t.delete();
		}
		
		List<Action> actionsList = Ebean.find(Action.class).findList();
//		triggersList.removeAll(actionsList);
		for (Action a : actionsList) {
			System.out.println(a.getName());
			a.delete();
		}
		
		List<Channel> channelsList = Ebean.find(Channel.class).findList();
//		channelsList.removeAll(channelsList);
		for (Channel c : channelsList) {				
			System.out.println(c);
			c.delete();
		}
		
		List<Recipe> recipesList = Ebean.find(Recipe.class).findList();
//		channelsList.removeAll(channelsList);
		for (Recipe r : recipesList) {				
			System.out.println(r);
			r.delete();
		}
		
		List<User> usersList = Ebean.find(User.class).findList();
//		channelsList.removeAll(channelsList);
		for (User u : usersList) {				
			System.out.println(u);
			u.delete();
		}
		

			

			Logger.info("Init Data");
			
			//Users
			User user1 = new User("1", "1", "user", "home1");
			user1.save();
			
			User user2 = new User("2", "2", "administrator", "home1");
			user2.save();
			
			
			
			
			
			
			
			//HUMAN CHANNEL
			Channel human = new Channel("Human","Can enter or exit room");
			human.save();
			
			Action humanEnterRoomAction = new Action("Enter room");
			human.getActions().add(humanEnterRoomAction);
			humanEnterRoomAction.setChannel(human);
			humanEnterRoomAction.save();
			
			Action humanExitRoomAction = new Action("Exit room");
			human.getActions().add(humanExitRoomAction);
			humanExitRoomAction.setChannel(human);
			humanExitRoomAction.save();
			
			
			human.save();
			
			
			
			
			//PRESENCE DETECTOR CHANNEL
	    	Channel detector = new Channel("Detector", "Detects humans");
	    	detector.save();
	    	
	    	
	    	Trigger detectorTrigger1 = new Trigger("Presence Trigger", "Trigger description");
	    	detector.getTriggers().add(detectorTrigger1);    	
	    	detectorTrigger1.setChannel(detector);
	    	detectorTrigger1.save();
	    	
	    	
	    	Trigger detectorTrigger2 = new Trigger("Non presence Trigger");
	    	detector.getTriggers().add(detectorTrigger2);
	    	detectorTrigger2.setChannel(detector);
	    	detectorTrigger2.save();
	    	
	    	detector.save();
	    	
	    	
	    	//LUMINOSITY DETECTOR CHANNEL
	    	Channel luminosityDetector = new Channel("Luminosity detector", "Detects luminosity");
	    	luminosityDetector.save();
	    	
	    	

	    	
	    	
	    	Trigger detectorTrigger12 = new Trigger("Light Trigger", "Trigger description 00000");
	    	luminosityDetector.getTriggers().add(detectorTrigger12);
	    	
	    	detectorTrigger12.save();
	    	
	    	List<Field> fields = new ArrayList<Field>();
	    	for (int i = 0; i < 2; i++) {
	    		Field field = new Field((new String("Field name " + i)), new String("Field description " + i));
	    		field.setTrigger(detectorTrigger12);
	    		field.save();
	    		fields.add(field);
	    		
	    	}
	    	
	    	detectorTrigger12.setChannel(detector);
	    	detectorTrigger12.save();
	    		    	
	    	
	    	
	    	Trigger detectorTrigger13 = new Trigger("Non light Trigger");
	    	luminosityDetector.getTriggers().add(detectorTrigger13);
	    	detectorTrigger13.setChannel(luminosityDetector);
	    	detectorTrigger13.save();
	    	
	    	
	    	Trigger detectorTrigger14 = new Trigger("Light Trigger1", "Trigger description");
	    	luminosityDetector.getTriggers().add(detectorTrigger14);
	    	detectorTrigger14.save();
	    	detectorTrigger14.setChannel(detector);
	    	
	    	Trigger detectorTrigger15 = new Trigger("Light Trigger2", "Trigger description");
	    	luminosityDetector.getTriggers().add(detectorTrigger15);
	    	detectorTrigger15.save();
	    	detectorTrigger15.setChannel(detector);
	    	
	    	Trigger detectorTrigger16 = new Trigger("Light Trigger3", "Trigger description");
	    	luminosityDetector.getTriggers().add(detectorTrigger16);
	    	detectorTrigger16.save();
	    	detectorTrigger16.setChannel(detector);
	    	
	    	Trigger detectorTrigger17 = new Trigger("Light Trigger", "Trigger description");
	    	luminosityDetector.getTriggers().add(detectorTrigger17);
	    	detectorTrigger17.save();
	    	detectorTrigger17.setChannel(detector);
	    	
	    	Trigger detectorTrigger18 = new Trigger("Light Trigger", "Trigger description");
	    	luminosityDetector.getTriggers().add(detectorTrigger18);
	    	detectorTrigger18.save();
	    	detectorTrigger18.setChannel(detector);
	    	
	    	luminosityDetector.save();
	    	
	    	
	    	
	    	
	    	
	    	
	    	
	    	//LAMP CHANNEL
	    	Channel lamp = new Channel("Lamp", "I am a Lamp");
	    	lamp.save();
	    	
	    	Action lampAction1 = new Action("Turn on lamp");
	    	lamp.getActions().add(lampAction1);
	    	lampAction1.setChannel(lamp);
	    	lampAction1.save();
	    	
	    	Action lampAction2 = new Action("Turn off lamp");
	    	lamp.getActions().add(lampAction2);
	    	lampAction2.setChannel(lamp);
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