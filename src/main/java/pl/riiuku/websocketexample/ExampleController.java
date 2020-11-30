package pl.riiuku.websocketexample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExampleController {

    @GetMapping
    String getVideoCallAsExample() {
        return "example";
    }
}
