package com.kotlinweb.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class GameController() {

    @GetMapping("/game")
    fun game(model: Model): String {
        return "game"
    }
}