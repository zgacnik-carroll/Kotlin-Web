package com.kotlinweb.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

/**
 * Controller responsible for handling requests related to the game page.
 *
 * This controller maps HTTP requests to view templates using Spring MVC.
 * When a user navigates to the `/game` endpoint, the corresponding Thymeleaf
 * template is returned and rendered in the browser.
 */
@Controller
class GameController {

    /**
     * Handles GET requests for the game page.
     *
     * @param model Spring MVC model used to pass attributes to the view.
     *              Currently unused but kept for future extensibility
     *              (e.g., player state, configuration, leaderboard data).
     *
     * @return The logical view name `game`, which resolves to `game.html`
     *         inside the templates directory when using Thymeleaf.
     */
    @GetMapping("/game")
    fun game(model: Model): String {
        // Returns the Thymeleaf template named "game"
        return "game"
    }
}