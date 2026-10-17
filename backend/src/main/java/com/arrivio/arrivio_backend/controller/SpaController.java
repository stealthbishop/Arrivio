package com.arrivio.arrivio_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * SPA Controller — forwards non-API, non-asset SPA navigation routes
 * to index.html so React can handle client-side rendering.
 */
@Controller
public class SpaController {

    @GetMapping(value = {
        "/",
        "/find-rides",
        "/match-compare",
        "/confirm-booking",
        "/my-commutes",
        "/impact-tracker",
        "/driver",
        "/safety"
    })
    public String forwardRoutes() {
        return "forward:/index.html";
    }

    /**
     * Fallback for single-depth subroutes that do not contain an extension
     * and do not start with api or assets.
     */
    @RequestMapping(value = "/{path:[a-zA-Z0-9_-]+}")
    public String forwardSingle(HttpServletRequest request) {
        String uri = request.getRequestURI();
        if (uri.startsWith("/api") || uri.startsWith("/h2-console") || uri.startsWith("/assets")) {
            return null;
        }
        return "forward:/index.html";
    }
}

