package pl.riiuku.websocketexample;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class VideoSocketController {


    @MessageMapping("/video-call")
    @SendTo("/topic/video-call")
    public byte[] sendVideoBytes(byte[] message) {
        return message;
    }

}
