const wheel = document.getElementById("wheel");
const resultDisplay = document.getElementById("result-display");
const spinBtn = document.getElementById("spinBtn");

// Define your slices in ORDER (Clockwise from the top/0 degrees)
// Note: The arrow is at the top (0 deg).
// As the wheel spins clockwise, the segments pass under the arrow.
const prizes = [
  { name: "kiss on Lip for 5 Seconds", color: "#e74c3c" },
  { name: "Kiss on Neck", color: "#3498db" },
  { name: "Blindfold Tease for one 1-2 minutes", color: "#9b59b6" },
  { name: "tease your lover intimate area with hand", color: "#f1c40f" },
  { name: "Lick your Lover Below the Weist", color: "#e67e22" },
  { name: "Name the Next Move your lover wants to do.", color: "#f032e6" },
  { name: "oral for 30sec", color: "#bcf60c" },
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

function initializeGame() {
  rebuildWheel();
  confirm("Welcome to the Spinning Wheel Game! Are you ready to find out your next adventure?");
  alert("Rules: before Starting game Each player have to wearing exect 4 no. of clothing items. Each player takes turns spinning the wheel. When the wheel stops, the player must have to complete the task that is displayed.They will help you and your partner explore new experiences together. The game continues until all the tasks have been completed. Remember to have fun and enjoy the time with your partner!");
//   alert("How to Play: Click the SPIN button to spin the wheel. When the wheel stops, you'll receive a fun and exciting task to do with your partner! Each task is designed to bring you closer together and add some spice to your relationship. Enjoy the game and have fun exploring new experiences together! Enjoy the game and have a great time with your partner!");
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
  resultDisplay.innerText = "Task: " + winner.name;

  // 6. Remove the winning prize from active prizes
  activePrizes.splice(sliceIndex, 1);

  // 7. Rebuild the wheel without the won segment
  setTimeout(() => {
    rebuildWheel();
  }, 500);
}

// Initialize wheel on page load
window.addEventListener("load", initializeGame);
