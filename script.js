const wheel = document.getElementById("wheel");
const resultDisplay = document.getElementById("result-display");
const spinBtn = document.getElementById("spinBtn");

// Setup variables
let player1Color = null;
let player2Color = null;
let firstPlayerToStart = null;
let currentPlayer = null;

// Game state
let players = {
  1: { name: "Player 1", color: null, wins: [] },
  2: { name: "Player 2", color: null, wins: [] }
};

// Define your slices in ORDER (Clockwise from the top/0 degrees)
// Note: The arrow is at the top (0 deg).
// As the wheel spins clockwise, the segments pass under the arrow.
const prizes = [
  { name: "kiss on Lip for 5 Seconds", color: "#e74c3c" },
  { name: "Kiss on Neck", color: "#3498db" },
  { name: "Blindfold Tease for 1-2 minutes", color: "#9b59b6" },
  { name: "tease your lover intimate area with hand for 30 seconds", color: "#f1c40f" },
  { name: "Lick your Lover Below the Weist", color: "#e67e22" },
  { name: "Name the Next Move your lover wants to do.", color: "#f032e6" },
  { name: "oral for 10sec", color: "#bcf60c" },
  { name: "ask him/ her that, What’s the boldest thing you’d want me to say to you in a private moment?", color: "#faacac" },
  { name: "Remove one of your Lover clothes", color: "#008080" },
  { name: "kiss on Lip for 1 Minute", color: "#bc5df7" },
  { name: "cuddle each other for 2-3seconds", color: "#9a6324" },
  { name: "Erotic Dare", color: "#87ceeb" },
  { name: "Lick your Lover above the Weist", color: "#f75a21" },
  { name: "Both people reveal two of their personal secrets.", color: "#ffd700" },
  { name: "Remove one of your Lover clothes", color: "#cc0282" },
  { name: "Lick your Lover Chest for 1 Minute", color: "#ffd881" },
  { name: "take off one cloth but your lover use their mouth. ", color: "#808000" },
  { name: "Remove her/his_bra/vest", color: "#800000" },
  { name: "watch Porn 3min with your lover and remove 1 cloth", color: "#fffac8" },
  { name: "Dance together ", color: "#aaffc3" },
  { name: "Press her Boobs OR Shake panis", color: "#e50808" },
  { name: "Remove bottom cloths", color: "#5a1c31" },
  { name: "lay down each other for next round", color: "#07cadb" },
  { name: "Remove T-Shirts", color: "#027230" },
  { name: "both jurking off together without touching eachother for 30sec", color: "#fd9d4a" },
  { name: "Remove one of your Lover clothes", color: "#2ecc71" }

];

let activePrizes = [...prizes]; // Track which prizes are still in play
let currentRotation = 0;
let gameComplete = false;

// ===== SETUP SCREEN FUNCTIONS =====

function setupColorPickers() {
  const colorOptions = document.querySelectorAll(".color-option");
  confirm("Welcome to the Spinning Wheel Game! Are you ready to find out your next adventure?");
  colorOptions.forEach(option => {
    option.addEventListener("click", function() {
      const player = this.dataset.player;
      const color = this.dataset.color;
      
      // Remove previous selection for this player
      document.querySelectorAll(`.color-option[data-player="${player}"]`).forEach(el => {
        el.classList.remove("selected");
      });
      
      // Add selection to clicked option
      this.classList.add("selected");
      
      // Save color
      if (player === "1") {
        player1Color = color;
        players[1].color = color;
        document.getElementById("player1-color-display").innerText = `Selected: ${color}`;
      } else {
        player2Color = color;
        players[2].color = color;
        document.getElementById("player2-color-display").innerText = `Selected: ${color}`;
      }
      
      checkSetupComplete();
    });
  });
}

function setFirstPlayer(playerNum) {
  firstPlayerToStart = playerNum;
  currentPlayer = playerNum;
  
  // Update button states
  document.querySelectorAll(".first-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  
  event.target.classList.add("active");
  
  checkSetupComplete();
}

function checkSetupComplete() {
  const startBtn = document.getElementById("start-btn");
  
  if (player1Color && player2Color && firstPlayerToStart) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}

function startGame() {
  // Hide setup screen and show game screen
  document.getElementById("setup-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
  
  // Initialize game
  rebuildWheel();
  updateTurnIndicator();
  
}

// ===== TURN INDICATOR =====

function updateTurnIndicator() {
  const indicator = document.getElementById("player-turn-indicator");
  const playerName = currentPlayer === 1 ? "Player 1" : "Player 2";
  const playerColor = currentPlayer === 1 ? player1Color : player2Color;
  
  indicator.innerText = playerName + "'s Turn";
  indicator.className = "turn-indicator player" + currentPlayer;
  indicator.style.background = `linear-gradient(135deg, ${playerColor} 0%, ${adjustBrightness(playerColor, -20)} 100%)`;
}

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnIndicator();
}

// Helper function to adjust color brightness
function adjustBrightness(color, amount) {
  const col = parseInt(color.slice(1), 16);
  const num = Math.max(0, Math.min(255, (col >> 16) + amount));
  const g = Math.max(0, Math.min(255, (col >> 8 & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (col & 0x0000FF) + amount));
  return "#" + (0x1000000 + (num << 16) + (g << 8) + b).toString(16).slice(1);
}

// ===== WHEEL FUNCTIONS =====

function rebuildWheel() {
  if (activePrizes.length === 0) {
    wheel.style.background = "#34495e";
    spinBtn.disabled = true;
    
    // Wait 10 seconds before showing the redirect message
    setTimeout(() => {
      const redirectMsg = document.getElementById("redirect-message");
      redirectMsg.style.display = "block";
      redirectMsg.innerText = "Redirecting to Second Round...";
      
      // Redirect to tasks page after another 1.5 seconds
      setTimeout(() => {
        window.location.href = "pages/tasks.html";
      }, 1500);
    }, 10000);
    
    gameComplete = true;
    return;
  }

  const sliceSize = 360 / activePrizes.length;
  let gradient = "conic-gradient(";

  activePrizes.forEach((prize, index) => {
    const startAngle = index * sliceSize;
    const endAngle = (index + 1) * sliceSize;
    gradient += `${prize.color} ${startAngle}deg ${endAngle}deg`;

    if (index < activePrizes.length - 1) {
      gradient += ", ";
    }
  });

  gradient += ")";
  wheel.style.background = gradient;
}

function spinWheel() {
  if (activePrizes.length === 0){
    return;
  } 

  spinBtn.disabled = true;
  resultDisplay.innerText = "Spinning...";

  const extraDegrees = Math.floor(Math.random() * 360);
  const totalSpins = (Math.floor(Math.random() * 5) + 5) * 360;

  currentRotation += totalSpins + extraDegrees;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Wait for animation to finish (4 seconds)
  setTimeout(() => {
    calculateResult(currentRotation);
    spinBtn.disabled = false;
  }, 4000);
}

function calculateResult(rotation) {
  // 1. Get the remainder of the rotation to find the final position
  // 2. Subtract from 360 because the wheel moves clockwise
  //    but the prizes are static relative to the wheel's 0 point.
  const actualDeg = rotation % 360;
  const winningAngle = (360 - actualDeg) % 360;

  // 3. Calculate slice size based on active prizes
  const sliceSize = 360 / activePrizes.length;

  // 4. Determine which slice index won
  const sliceIndex = Math.floor(winningAngle / sliceSize) % activePrizes.length;

  // 5. Get the prize
  const winner = activePrizes[sliceIndex];
  const playerName = currentPlayer === 1 ? "Player 1" : "Player 2";
  resultDisplay.innerText = playerName + " - Task: " + winner.name;

  // 6. Save to player's wins
  players[currentPlayer].wins.push(winner.name);

  // 7. Remove the winning prize from active prizes
  activePrizes.splice(sliceIndex, 1);

  // 8. Switch to next player
  setTimeout(() => {
    switchTurn();
  }, 1000);

  // 9. Rebuild the wheel without the won segment
  setTimeout(() => {
    rebuildWheel();
  }, 500);
}

// Initialize wheel on page load
window.addEventListener("load", function() {
  setupColorPickers();
});
