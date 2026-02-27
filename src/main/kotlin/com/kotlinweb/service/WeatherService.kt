package com.kotlinweb.service

import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class WeatherService {

    fun currentWeather(): String {
        val options = listOf("clear", "light_snow", "heavy_fog")
        return options[Random.nextInt(options.size)]
    }
}