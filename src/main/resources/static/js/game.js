document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("atmosphere");
    const ctx = canvas.getContext("2d");
    const world = document.getElementById("world");
    const owl = document.getElementById("owl");
    const encounter = document.getElementById("encounter");

    const treesFar = document.querySelector(".trees.far");
    const treesMid = document.querySelector(".trees.mid");
    const treesFrontContainer = document.querySelector(".trees.front");

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
        maxX = world.offsetWidth - window.innerWidth;
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
       Spread out the tree layers
    ========================= */
    treesFar.style.bottom = `${Math.random() * 40}px`; // slight vertical offset
    treesMid.style.bottom = `${Math.random() * 30}px}`;
    treesFrontContainer.style.bottom = `0px`; // front trees always at ground

    /* =========================
       Generate front trees randomly
    ========================= */
    const treeCount = 10;       // number of front trees
    const minSpacing = 150;
    const maxSpacing = 400;
    const treePositions = [];
    let currentX = 50;          // start with some offset

    for (let i = 0; i < treeCount; i++) {
        const treeX = currentX + minSpacing + Math.random() * (maxSpacing - minSpacing);
        currentX = treeX;

        const tree = document.createElement("img");
        tree.src = "/img/tree_front.svg";
        tree.classList.add("tree");
        tree.style.left = `${treeX}px`;

        // Optional: random tree height for more natural look
        const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        tree.style.transform = `scaleY(${scale})`;

        treesFrontContainer.appendChild(tree);
        treePositions.push({x: treeX, scale: scale});
    }

    /* =========================
   Place owl at a random position above ground
========================= */
    const minBottomPercent = 20;  // owl will be at least 20% above bottom
    const maxBottomPercent = 60;  // owl will be no higher than 60%

// Random horizontal position across world
    const owlX = Math.random() * (world.offsetWidth - 80); // 80 is owl width
    owl.style.left = `${owlX}px`;

// Random vertical position above ground
    const owlBottom = minBottomPercent + Math.random() * (maxBottomPercent - minBottomPercent);
    owl.style.bottom = `${owlBottom}%`;

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
        treesFrontContainer.style.transform = `translate3d(${-playerX * 1.1}px,0,0)`;
    }

    /* =========================
       Owl click to trigger encounter
    ========================= */
    owl.addEventListener("click", () => {
        encounter.classList.remove("hidden");
        owl.style.transform = "scale(1.2)";
        setTimeout(() => { owl.style.transform = "scale(1)"; }, 500);
    });

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