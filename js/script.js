let fountainInterval, isFountainActive = !1;
function isFountainAllowed() {
    return window.innerWidth > 768
}
function triggerKabosuminiFountain(t, e, n) {
    for (let o = 0; o < n; o++)
        createKabosuminiParticle(t, e)
}
function createKabosuminiParticle(t, e) {
    let n = document.createElement("img");
    n.src = "images/kevin.jpg",
    n.classList.add("kabosumini-effect"),
    n.style.left = `${t}px`,
    n.style.top = `${e}px`,
    document.body.appendChild(n);
    let o = 15 * Math.random() + 10;
    n.style.width = `${o}px`,
    n.style.height = `${o}px`;
    let i = Math.random() * Math.PI * 2
      , a = 3 * Math.random() + 2
      , r = Math.cos(i) * a
      , l = Math.sin(i) * a
      , c = 1
      , s = 0;
    !function o() {
        s < 90 ? (l += .05,
        t += r,
        e += l,
        c -= .011111111111111112,
        n.style.left = `${t}px`,
        n.style.top = `${e}px`,
        n.style.opacity = c,
        s++,
        requestAnimationFrame(o)) : n.remove()
    }()
}
document.addEventListener("mousedown", function(t) {
    if (!isFountainAllowed() || t.target.closest("button, a, .contract-box"))
        return;
    let e = t.pageX
      , n = t.pageY
      , o = 0;
    isFountainActive = !0,
    clearInterval(fountainInterval),
    fountainInterval = setInterval( () => {
        if (!isFountainActive)
            return;
        let t = Math.min(Math.floor(o / 100) + 1, 20);
        triggerKabosuminiFountain(e, n, t),
        o += 100
    }
    , 100)
}),
document.addEventListener("mouseup", function(t) {
    isFountainActive = !1,
    clearInterval(fountainInterval)
}),
document.addEventListener("mouseleave", function(t) {
    isFountainActive = !1,
    clearInterval(fountainInterval)
}),
document.addEventListener("touchstart", function(t) {
    if (!isFountainAllowed() || t.target.closest("button, a, .contract-box"))
        return;
    let e = t.touches[0]
      , n = e.pageX
      , o = e.pageY
      , i = 0;
    isFountainActive = !0,
    clearInterval(fountainInterval),
    fountainInterval = setInterval( () => {
        if (!isFountainActive)
            return;
        let t = Math.min(Math.floor(i / 100) + 1, 20);
        triggerKabosuminiFountain(n, o, t),
        i += 100
    }
    , 100)
}, {
    passive: !1
}),
document.addEventListener("touchend", function(t) {
    isFountainActive = !1,
    clearInterval(fountainInterval)
}),
document.addEventListener("touchcancel", function(t) {
    isFountainActive = !1,
    clearInterval(fountainInterval)
}),
document.addEventListener("contextmenu", function(t) {
    if (!isFountainAllowed() || (t.preventDefault(),
    t.target.closest("button, a, .contract-box")))
        return;
    let e = t.pageX
      , n = t.pageY;
    triggerKabosuminiFountain(e, n, 25)
});
const contractBox = document.querySelector(".contract-box");
function copyToClipboard(t) {
    navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(t).then( () => {
        showCopyMessage()
    }
    ).catch(e => {
        fallbackCopyTextToClipboard(t)
    }
    ) : fallbackCopyTextToClipboard(t)
}
function fallbackCopyTextToClipboard(t) {
    let e = document.createElement("textarea");
    e.value = t,
    e.style.position = "fixed",
    e.style.top = "0",
    e.style.left = "0",
    e.style.opacity = "0",
    document.body.appendChild(e),
    e.focus(),
    e.select();
    try {
        let n = document.execCommand("copy");
        n ? showCopyMessage() : console.error("Fallback: Copying text command was unsuccessful")
    } catch (o) {
        console.error("Fallback: Oops, unable to copy", o)
    }
    document.body.removeChild(e)
}
function showCopyMessage() {
    let t = document.getElementById("copy-message");
    t.style.display = "inline",
    setTimeout( () => {
        t.style.display = "none"
    }
    , 2e3)
}
function truncateMiddle(t, e) {
    if (t.length <= e)
        return t;
    let n = t.length - Math.floor(e / 2);
    return t.slice(0, Math.ceil(e / 2)) + "..." + t.slice(n)
}
function updateContractAddress() {
    let t = contractBox.getAttribute("data-full-text")
      , e = contractBox.querySelector(".contract-address")
      , n = contractBox.clientWidth;
    e.textContent = truncateMiddle(t, Math.floor(n / 10))
}
contractBox.addEventListener("click", function(t) {
    t.stopPropagation();
    let e = this.getAttribute("data-full-text");
    copyToClipboard(e)
}),
contractBox.addEventListener("touchend", function(t) {
    t.stopPropagation();
    let e = this.getAttribute("data-full-text");
    copyToClipboard(e)
}),
contractBox.addEventListener("touchstart", function(t) {
    t.stopPropagation()
}),
updateContractAddress(),
window.addEventListener("resize", updateContractAddress),
document.addEventListener("DOMContentLoaded", () => {
    let t = document.getElementById("carousel-content")
      , e = t.parentElement.clientWidth
      , n = t.innerHTML;
    for (; t.scrollWidth < 2 * e; )
        t.innerHTML += n
}
);


const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const gameOverMessage = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const closeButton = document.getElementById("close-button");

let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;
let gameOverTimeout;

// Function to create targets
function createTarget() {
  const target = document.createElement("div");
  target.classList.add("target");
  target.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;
  target.style.animationDuration = `${2 + Math.random() * 3}s`;

  // Add click event to targets
  target.addEventListener("click", () => {
    score += target.style.backgroundColor === "rgb(255, 215, 0)" ? 50 : 10; // Bonus for golden targets
    scoreDisplay.textContent = score;
    target.remove();
  });

  gameArea.appendChild(target);

  // Remove target after animation ends
  target.addEventListener("animationend", () => target.remove());

  // Occasionally spawn a golden target
  if (Math.random() < 0.1) {
    target.style.backgroundColor = "#FFD700"; // Golden color
  }
}

// Timer logic
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);
}

// End game function
function endGame() {
  // Stop the game and show the Game Over message
  gameOverMessage.classList.remove("hidden");
  gameOverMessage.style.display = "block";
  finalScoreDisplay.textContent = score;

  // Set a timeout to hide the message after 10 seconds
  gameOverTimeout = setTimeout(() => {
    gameOverMessage.style.display = "none";
  }, 10000);

  // Re-enable the start button
  startButton.disabled = false;
}

// Start game function
function startGame() {
  // Reset score and timer
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  // Hide the Game Over message
  gameOverMessage.style.display = "none";
  clearTimeout(gameOverTimeout); // Clear any pending timeout

  // Start spawning targets and timer
  gameInterval = setInterval(createTarget, 1000);
  startTimer();

  // Disable the start button during the game
  startButton.disabled = true;
}

// Close the Game Over message immediately
closeButton.addEventListener("click", () => {
  gameOverMessage.style.display = "none";
  clearTimeout(gameOverTimeout); // Prevent auto-hide logic from triggering later
});

// Attach event listener to the start button
startButton.addEventListener("click", startGame);