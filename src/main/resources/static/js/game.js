/**
 * Owl Catcher Game
 * Handles canvas starfield, parallax background, player movement, and owl interactions
 */

document.addEventListener("DOMContentLoaded", () => {

    // Canvas setup for stars
    const canvas = document.getElementById("atmosphere")
    const ctx = canvas.getContext("2d")

    // Main game world container and interactive elements
    const world = document.getElementById("world")
    const owl = document.getElementById("owl")
    const encounter = document.getElementById("encounter")

    // Parallax layers for trees
    const treesFar = document.querySelector(".trees.far")
    const treesMid = document.querySelector(".trees.mid")
    const treesFrontContainer = document.querySelector(".trees.front")

    let width, height
    let stars = []

    let maxX = 0

    /**
     * Resize canvas and calculate max horizontal movement
     */
    function resize() {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        maxX = world.offsetWidth - window.innerWidth
        if (maxX < 0) maxX = 0
    }

    window.addEventListener("resize", resize)
    resize()

    /**
     * Initialize starfield
     * Each star has random position, size, phase, and speed
     * Phase is used in a sine function for smooth twinkling effect
     * Speed varies slightly so stars twinkle independently
     */
    const STAR_COUNT = 100
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.04
        })
    }

    let playerX = 0
    let velocity = 0
    const speed = 4.5
    const keys = {}

    window.addEventListener("keydown", e => keys[e.key] = true)
    window.addEventListener("keyup", e => keys[e.key] = false)

    const WORLD_WIDTH = 4000
    let owlMoving = true

    /**
     * Move owl to a random position within the world
     * Owl also randomly moves vertically to simulate flying
     * Stops when player clicks on owl
     */
    function moveOwlRandomly() {
        if (!owlMoving) return

        const owlWidth = owl.offsetWidth || 80
        const newX = Math.random() * (WORLD_WIDTH - owlWidth)
        const newBottom = 20 + Math.random() * 40

        owl.style.left = newX + "px"
        owl.style.bottom = newBottom + "%"
    }

    moveOwlRandomly()
    const owlTimer = setInterval(moveOwlRandomly, 2000)

    /**
     * Update world movement based on player input
     * Implements parallax by moving tree layers at different speeds
     */
    function updateMovement() {
        if (keys["a"] || keys["ArrowLeft"]) velocity = -speed
        else if (keys["d"] || keys["ArrowRight"]) velocity = speed
        else velocity *= 0.85

        playerX += velocity
        playerX = Math.max(0, Math.min(playerX, maxX))

        world.style.transform = `translate3d(${-playerX}px,0,0)`
        treesFar.style.transform = `translate3d(${-playerX * 0.3}px,0,0)`
        treesMid.style.transform = `translate3d(${-playerX * 0.6}px,0,0)`
        treesFrontContainer.style.transform = `translate3d(${-playerX * 1.1}px,0,0)`
    }

    /**
     * Handle owl click
     * Stops owl movement and displays encounter popup
     * Briefly scales owl for visual feedback
     */
    owl.addEventListener("click", () => {
        owlMoving = false
        clearInterval(owlTimer)
        encounter.classList.remove("hidden")
        owl.style.transform = "scale(1.2)"
        setTimeout(() => { owl.style.transform = "scale(1)" }, 500)
    })

    /**
     * Draw stars on canvas
     * Uses sine of phase to smoothly oscillate opacity for twinkle effect
     */
    function drawStars() {
        stars.forEach(s => {
            s.phase += s.speed
            const alpha = 0.3 + Math.sin(s.phase) * 0.4
            ctx.fillStyle = `rgba(255,255,255,${alpha})`
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
            ctx.fill()
        })
    }

    /**
     * Main animation loop
     * Clears canvas, updates movement, draws stars, then requests next frame
     */
    function animate() {
        ctx.clearRect(0, 0, width, height)
        updateMovement()
        drawStars()
        requestAnimationFrame(animate)
    }

    animate()

    /**
     * Restart and quit button functionality
     * Restart reloads the page
     * Quit redirects to home page
     */
    const restartBtn = document.querySelector(".restartBtn")
    const quitBtn = document.querySelector(".quitBtn")

    restartBtn.addEventListener("click", () => location.reload())
    quitBtn.addEventListener("click", () => window.location.href = "/")
})