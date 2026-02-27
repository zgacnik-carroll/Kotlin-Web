package com.kotlinweb.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class GoodbyeController {

    @GetMapping("/goodbye")
    fun goodbye(): String {
        return "goodbye"
    }
}