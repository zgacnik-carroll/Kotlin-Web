package com.kotlinweb.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

/**
 * Controller responsible for handling requests to the application's home page.
 *
 * This controller maps the root URL (`/`) to the home Thymeleaf template.
 * It also provides a [Model] parameter for future extensibility, allowing
 * attributes to be passed to the view without changing the method signature.
 */
@Controller
class HomeController {

    /**
     * Handles GET requests for the home page.
     *
     * @param model Spring MVC model used to pass data to the view layer.
     *              Currently unused but intentionally kept for future
     *              enhancements (e.g., dynamic UI data, user state, stats).
     *
     * @return The logical view name `home`, which resolves to `home.html`
     *         within the templates directory when using Thymeleaf.
     */
    @GetMapping("/")
    fun home(model: Model): String {
        // Returns the Thymeleaf template named "home"
        return "home"
    }
}