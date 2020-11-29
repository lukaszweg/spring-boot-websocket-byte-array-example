package pl.riiuku.websocketexample;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.ByteArrayMessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import javax.websocket.ContainerProvider;
import javax.websocket.WebSocketContainer;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.concurrent.*;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class VideoSocketControllerTest {

    private final WebSocketStompClient client =
            new WebSocketStompClient
                    (new StandardWebSocketClient(createContainer()));;


    @LocalServerPort
    private int port;

    @Test
    public void sendVideoBytes() throws InterruptedException, ExecutionException, TimeoutException, IOException {
        //given
        byte[] file = Files.readAllBytes(Paths.get("src/test/resources/static/test.jpg"));
        BlockingQueue<byte[]> values = new ArrayBlockingQueue<>(1);
        client.setMessageConverter(new ByteArrayMessageConverter());
        StompSession stomp = client
                .connect("ws://localhost:" + port + "/socket", new StompSessionHandlerAdapter() {
                })
                .get(1L, TimeUnit.SECONDS);
        //when
        stomp.subscribe("/topic/video-call", new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                return byte[].class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                values.add((byte[]) payload);
            }
        });

        stomp.send("/app/video-call", file);

        //then
        // NOTE -> performance of method assertEquals for big byte[] is terrible!
        assertArrayEquals(file, values.poll(1L, TimeUnit.SECONDS));

    }

    private WebSocketContainer createContainer() {
        WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        container.setDefaultMaxBinaryMessageBufferSize(1024 * 1024);
        container.setDefaultMaxTextMessageBufferSize(1024 * 1024);
        return container;
    }
}