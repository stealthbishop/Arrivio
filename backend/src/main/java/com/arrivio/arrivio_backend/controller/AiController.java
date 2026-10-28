package com.arrivio.arrivio_backend.controller;

import com.arrivio.arrivio_backend.service.GroqChatService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final GroqChatService groqChatService;

    public AiController(GroqChatService groqChatService) {
        this.groqChatService = groqChatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        return ResponseEntity.ok(new ChatResponse(groqChatService.chat(request.message())));
    }

    public record ChatRequest(
            @NotBlank(message = "Message cannot be empty")
            @Size(max = 4000, message = "Message must be 4000 characters or fewer")
            String message) {
    }

    public record ChatResponse(String reply) {
    }
}
