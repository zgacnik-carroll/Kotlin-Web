package com.kotlinweb.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

/**
 * Controller responsible for handling navigation to the goodbye page.
 *
 * This controller maps the `/goodbye` endpoint to its corresponding
 * Thymeleaf template, allowing users to view a farewell page when
 * accessing the route.
 */
@Controller
class GoodbyeController {

    /**
     * Handles GET requests for the goodbye page.
     *
     * @return The logical view name `goodbye`, which resolves to
     *         `goodbye.html` inside the templates directory when
     *         using Thymeleaf.
     */
    @GetMapping("/goodbye")
    fun goodbye(): String {
        // Returns the Thymeleaf template named "goodbye"
        return "goodbye"
    }
}