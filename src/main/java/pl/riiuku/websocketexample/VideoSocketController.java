package pl.riiuku.websocketexample;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class VideoSocketController {


    /*
    Simple websocket method (If You want to get header, etc use @Header as parameter)
     */
    @MessageMapping("/video-call")
    @SendTo("/topic/video-call")
    public byte[] sendVideoBytes(byte[] message) {
        return message;
    }

}
