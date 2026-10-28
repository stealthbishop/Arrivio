package com.arrivio.arrivio_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class GroqChatService {

    private final RestClient restClient;
    private final String apiKey;
    private final String model;

    public GroqChatService(
            RestClient.Builder restClientBuilder,
            @Value("${GROQ_API_KEY:}") String apiKey,
            @Value("${GROQ_MODEL:llama-3.3-70b-versatile}") String model) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
        this.apiKey = apiKey;
        this.model = model;
    }

    public String chat(String message) {
        if (apiKey == null || apiKey.isBlank() || apiKey.equals("your_groq_api_key_here")) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Groq is not configured. Set GROQ_API_KEY in backend/.env.");
        }

        Map<String, Object> payload = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "You are Arrivio's helpful travel and carpooling assistant. Give clear, practical answers. Do not claim a ride is booked or verified unless the app confirms it."),
                        Map.of("role", "user", "content", message)
                ),
                "temperature", 0.4,
                "max_tokens", 700
        );

        try {
            JsonNode response = restClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .body(payload)
                    .retrieve()
                    .body(JsonNode.class);

            JsonNode content = response == null ? null : response.at("/choices/0/message/content");
            if (content == null || content.isMissingNode() || content.isNull()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY, "Groq returned an empty response.");
            }
            return content.asText();
        } catch (RestClientResponseException ex) {
            // Do not expose provider response bodies or credentials to clients.
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY, "The AI provider request failed. Please try again later.");
        }
    }
}
