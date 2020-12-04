package pl.riiuku.websocketexample;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;

@Controller
public class VideoSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /*
    Simple websocket method (If You want to get header, etc use @Header as parameter)
     */
    @CrossOrigin()
    @MessageMapping("/video-call")
    public void sendVideoBytes(byte[] message, @Header(value = "my-id") String id) {
        messagingTemplate.convertAndSend("/topic/video-call", message, Collections.singletonMap("my-id", id));
    }

}
