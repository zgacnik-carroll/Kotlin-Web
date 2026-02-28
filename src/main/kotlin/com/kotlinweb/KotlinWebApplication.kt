package com.kotlinweb

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

/**
 * Entry point for the Kotlin Web Spring Boot application.
 *
 * This class is annotated with [SpringBootApplication], which is a convenience
 * annotation that:
 *   - Marks this class as a Spring Boot configuration class
 *   - Enables component scanning for Spring components in the package
 *   - Enables auto-configuration
 *
 * The [main] function uses [runApplication] to launch the Spring Boot application.
 */
@SpringBootApplication
class KotlinWebApplication

/**
 * Application entry point.
 *
 * @param args Command-line arguments passed to the application.
 *             Currently unused, but can be leveraged for environment
 *             configuration or custom startup options.
 */
fun main(args: Array<String>) {
    runApplication<KotlinWebApplication>(*args)
}