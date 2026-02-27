const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
    window.location.href = "/game";  // redirects to the game page
});

document.querySelector(".endBtn").addEventListener("click", () => {
    window.location.href = "/goodbye";
});