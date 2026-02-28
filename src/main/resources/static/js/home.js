/**
 * Home page interactions
 * Handles button clicks to start game or exit to goodbye page
 */

// Get start button element
const startBtn = document.getElementById("startBtn")

// When start button is clicked
// Redirect user to the main game page
startBtn.addEventListener("click", () => {
    window.location.href = "/game"
})

// Get end program button element
const endBtn = document.querySelector(".endBtn")

// When end button is clicked
// Redirect user to the goodbye page
endBtn.addEventListener("click", () => {
    window.location.href = "/goodbye"
})