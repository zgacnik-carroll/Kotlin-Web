# Owl Catcher (Kotlin Web Application)

---

## Description

Owl Catcher is a web application game written in Kotlin. The user
is presented with a dark, starry, moonlit forest scene where the objective
of the game is to find an owl flying around in the forest scene.

---

## Requirements

- Kotlin 2.3.10 (run `kotlin -version` in a terminal to confirm)
- Java 21.0.7 (run `java --version` in a terminal to confirm)

---

## How to Play

When the program is running, the user will first be greeted with a
title screen that gives a quick set of instructions on how to play the game:

### Controls
- **A** — Move view left
- **D** — Move view right

*Along with the AD keys, the user can also move using the arrow keys.*

---

## How to Run

1. Clone this GitHub repository into your desired directory.
2. Navigate to your desired directory, then navigate to the cloned repository and run the following command:
   ```bash
   ./gradlew bootRun
   ```
This command uses Gradle within the Spring framework to both compile
and deploy the program on your local machine.

Now that the program is running behind the scenes, navigate to
[http://localhost:8080](http://localhost:8080) within a browser.

*Note: This program has only been tested on Google Chrome. The use of
other browsers may change the visual effects on the front-end of this game.*

---

## Features

This program includes many stylistic front-end features listed below:

- Animated starfield with twinkling effect
- Canvas-based rendering
- Smooth horizontal camera movement
- Scalable Vector Graphics (SVG)

Of these features, the most creative (and my personal favorite)
is the use of dynamically created stars that twinkle in the background of the game.
For further description on how they were built to twinkle, I have provided
a detailed diagram below:

![Star twinkle diagram](documentation/diagrams/StarTwinkle.png)

In a nutshell, a lot of math made the twinkling stars possible.
Be sure to notice how the use of the `sin()` function allowed for a
natural brightness oscillation to give a twinkling effect.

Additionally, it is significant to note that the geometric owl and trees that are
rendered within the game are Scalable Vector Graphics. SVGs are a critical enhancement to
front-end development in that they scale infinitely with the use of vectors.
So, no matter how much you zoom in on an SVG, it will keep crystal clear
resolution. Try it out yourself on the owl below!

![Owl model](documentation/models/owl.svg)

This isn't to say that a user will purposefully want to zoom in on the owl within the
game, but regardless it provides a more clean and efficient option as opposed to a
regular PNG or JPG file.

---

## Future Improvements

With more time allowed and effort mustered, these are some future
improvements I would like to make on this project:

- Timer scoring system
  - Incorporating a timer that tracks how long it takes a user to find and click the owl, as well as an in-memory H2 database that tracks highscores
- Difficulty scaling
  - Allow for difficulty selection on the home page that determines how long the owl stays in one spot for
- Sound effects
  - Adding nighttime forest sounds (owls hooting, leaves blowing in the wind, fireflies buzzing, etc.)

---

## Closing Remarks

Owl Catcher was created to strengthen my understanding of Kotlin,
Spring Boot, and web-based application development.
It combines backend logic with dynamic front end rendering
to create an immersive browser experience. Have fun playing Owl Catcher!