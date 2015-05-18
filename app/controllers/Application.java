package controllers;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import messages.AllMessages;
import models.Channel;
import play.data.DynamicForm;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;
import actors.AllActors;

public class Application extends Controller {

	public static String turnOnCheckbox = "";
	public static String turnOffCheckbox = "";	
	
    public static Result index() {
    	Boolean lampOn = false;
    	List<Channel> channelsList = Channel.getAllChannels();
        return ok(index.render(channelsList, lampOn));
    }
    
    public static Result submitForm() throws IOException {
    	Boolean lampOn = false;
    	
    	DynamicForm requestData = Form.form().bindFromRequest();
    	
    	turnOnCheckbox = requestData.get("turnOnCheckbox");
    	turnOffCheckbox = requestData.get("turnOffCheckbox");
    	
    	System.out.println("turn off checkbox: " + turnOffCheckbox);
    	
    	
        if (requestData.get("enterRoomButton") != null) {
        	// Tell the detector that a human entered the room
        	if (turnOnCheckbox != null) {
        		AllActors.detector.tell(new AllMessages.EnterRoom(true), AllActors.human);
        	} else {
        		AllActors.detector.tell(new AllMessages.EnterRoom(false), AllActors.human);
        	}
        	
        	try {
				TimeUnit.MILLISECONDS.sleep(10);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	if (AllActors.Lamp.state.equals("ON"))
        		lampOn = true;
        	else lampOn = false;
        	System.out.println("Enter room button - LampOn is TRUE");
        	
        } else if (requestData.get("exitRoomButton")!=null) {
            // Tell the detector that a human exited the room
        	if (turnOffCheckbox != null) {
        		AllActors.detector.tell(new AllMessages.ExitRoom(true), AllActors.human);
        	} else {
        		AllActors.detector.tell(new AllMessages.ExitRoom(false), AllActors.human);
        	}
        	
        	try {
				TimeUnit.MILLISECONDS.sleep(10);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	if (AllActors.Lamp.state.equals("OFF"))
        		lampOn = false;
        	else lampOn = true;
        	
        	System.out.println("Exit room button - LampOn is FALSE");
        }
        
        List<Channel> channelsList = Channel.getAllChannels();
        return ok(index.render(channelsList, lampOn));
    }

}
