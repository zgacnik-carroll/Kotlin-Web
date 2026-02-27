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

    let maxX = 0;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        maxX = world.offsetWidth - window.innerWidth;
        if (maxX < 0) maxX = 0;
    }
    window.addEventListener("resize", resize);
    resize();

    /* Stars */
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.02
        });
    }

    /* Movement */
    let playerX = 0;
    let velocity = 0;
    const speed = 4.5;
    const keys = {};
    window.addEventListener("keydown", e => (keys[e.key] = true));
    window.addEventListener("keyup", e => (keys[e.key] = false));

    /* Front tree generation */
    const treeCount = 10;
    const minSpacing = 150;
    const maxSpacing = 400;
    let currentX = 50;

    for (let i = 0; i < treeCount; i++) {
        const treeX = currentX + minSpacing + Math.random() * (maxSpacing - minSpacing);
        currentX = treeX;

        const tree = document.createElement("img");
        tree.src = "/img/tree_front.svg";
        tree.classList.add("tree");
        tree.style.left = `${treeX}px`;

        const scale = 0.8 + Math.random() * 0.4;
        tree.style.transform = `scaleY(${scale})`;

        treesFrontContainer.appendChild(tree);
    }

    /* Owl random spawn */
    const owlX = Math.random() * (world.offsetWidth - 80);
    owl.style.left = `${owlX}px`;

    const owlBottom = 20 + Math.random() * 40;
    owl.style.bottom = `${owlBottom}%`;

    function updateMovement() {
        if (keys["a"] || keys["ArrowLeft"]) velocity = -speed;
        else if (keys["d"] || keys["ArrowRight"]) velocity = speed;
        else velocity *= 0.85;

        playerX += velocity;
        playerX = Math.max(0, Math.min(playerX, maxX));

        world.style.transform = `translate3d(${-playerX}px,0,0)`;
        treesFar.style.transform = `translate3d(${-playerX * 0.3}px,0,0)`;
        treesMid.style.transform = `translate3d(${-playerX * 0.6}px,0,0)`;
        treesFrontContainer.style.transform = `translate3d(${-playerX * 1.1}px,0,0)`;
    }

    owl.addEventListener("click", () => {
        encounter.classList.remove("hidden");
        owl.style.transform = "scale(1.2)";
        setTimeout(() => { owl.style.transform = "scale(1)"; }, 500);
    });

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

    function animate() {
        ctx.clearRect(0, 0, width, height);
        updateMovement();
        drawStars();
        requestAnimationFrame(animate);
    }

    animate();

    const restartBtn = document.querySelector(".restartBtn");
    const quitBtn = document.querySelector(".quitBtn");

    restartBtn.addEventListener("click", () => {
        location.reload();
    });

    quitBtn.addEventListener("click", () => {
        window.location.href = "/";
    });

});