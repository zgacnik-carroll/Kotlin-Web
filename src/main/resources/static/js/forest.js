document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("atmosphere");
    const ctx = canvas.getContext("2d");
    const world = document.getElementById("world");
    const owl = document.getElementById("owl");
    const encounter = document.getElementById("encounter");

    const treesFar = document.querySelector(".trees.far");
    const treesMid = document.querySelector(".trees.mid");
    const treesFront = document.querySelector(".trees.front");

    let width, height;
    let stars = [];

    /* =========================
       Resize & world bounds
    ========================= */
    let maxX = 0;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        world.style.height = `${height}px`;

        const worldWidth = world.offsetWidth;
        const screenWidth = window.innerWidth;
        maxX = worldWidth - screenWidth;
        if (maxX < 0) maxX = 0;
    }
    window.addEventListener("resize", resize);
    resize();

    /* =========================
       Stars (twinkling)
    ========================= */
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.5,
            r: Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.02
        });
    }

    /* =========================
       Player movement
    ========================= */
    let playerX = 0;
    let velocity = 0;
    const speed = 4.5;
    const keys = {};

    window.addEventListener("keydown", e => keys[e.key] = true);
    window.addEventListener("keyup", e => keys[e.key] = false);

    /* =========================
       Owl setup
    ========================= */
    const owlWorldX = 1200 + Math.random() * 1000;
    owl.style.left = owlWorldX + "px";

    /* =========================
       Movement update
    ========================= */
    function updateMovement() {
        if (keys["a"] || keys["ArrowLeft"]) velocity = -speed;
        else if (keys["d"] || keys["ArrowRight"]) velocity = speed;
        else velocity *= 0.85;

        playerX += velocity;

        if (playerX < 0) playerX = 0;
        if (playerX > maxX) playerX = maxX;

        world.style.transform = `translate3d(${-playerX}px,0,0)`;
        treesFar.style.transform = `translate3d(${-playerX * 0.3}px,0,0)`;
        treesMid.style.transform = `translate3d(${-playerX * 0.6}px,0,0)`;
        treesFront.style.transform = `translate3d(${-playerX * 1.1}px,0,0)`;
    }

    /* =========================
       Owl click to trigger encounter
    ========================= */
    owl.addEventListener("click", () => {
        encounter.classList.remove("hidden");
        owl.style.transform = "scale(1.2)";
        setTimeout(() => { owl.style.transform = "scale(1)"; }, 500);
    });
    owl.setAttribute("tabindex", "-1");  // prevent focus from blocking keys
    owl.addEventListener("mousedown", e => e.preventDefault());

    /* =========================
       Draw stars
    ========================= */
    function drawStars() {
        stars.forEach(s => {
            s.phase += s.speed;
            const alpha = 0.3 + Math.sin(s.phase) * 0.4;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    /* =========================
       Animation loop
    ========================= */
    function animate() {
        ctx.clearRect(0, 0, width, height);
        updateMovement();
        drawStars();
        requestAnimationFrame(animate);
    }

    animate();

});