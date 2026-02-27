package com.kotlinweb.controller

import com.kotlinweb.service.WeatherService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class ForestController(
    private val weatherService: WeatherService
) {

    @GetMapping("/")
    fun forest(model: Model): String {
        val weather = weatherService.currentWeather()
        model.addAttribute("weather", weather)
        return "forest"
    }
}