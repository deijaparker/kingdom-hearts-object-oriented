const roundList = document.querySelector(".round");
let roundNumber = 1;

class Ship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  stats() {
    console.log(`Name: ${this.name}`);
    console.log(`Hull: ${this.hull}`);
    console.log(`Firepower: ${this.firepower}`);
    console.log(`Accuracy: ${this.accuracy}`);
  }

  attack(target) {
    let randomAccuracy = Math.random() * 10; // Random number between 0 and 10
    if (randomAccuracy <= this.accuracy) {
      target.hull -= this.firepower;
      const attackHit = document.createElement("li");
      attackHit.innerHTML = `Attack successful! ${this.name} dealt ${this.firepower} damage. ${target.name}'s remaining HP: ${target.hull}`;
      roundList.appendChild(attackHit);
      console.log(`Hit! ${this.name} accuracy: ${randomAccuracy}`);
      console.log(`${target.name} remaining HP: ${target.hull}`);
    } else {
      const attackMiss = document.createElement("li");
      attackMiss.innerHTML = `Attack missed! ${this.name}'s attack was ineffective. ${target.name}'s HP remains: ${target.hull}`;
      roundList.appendChild(attackMiss);
      console.log(`Missed! ${this.name}'s attack missed.`);
      console.log(`${target.name}'s HP remains: ${target.hull}`);
    }
  }
}
const hero = new Ship("Keyblade Hero", 20, 3, 7);
let enemyShip = createEnemyShip();

function createEnemyShip() {
  let enemyHull = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
  let enemyFirepower = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
  let enemyAccuracy = Math.random() * (8 - 6 + 1) + 6;
  return new Ship("Heartless", enemyHull, enemyFirepower, enemyAccuracy);
}

let currentPlayer = hero;
let currentDefender = enemyShip;

function switchTurn() {
    if (currentPlayer === hero) {
      currentPlayer = enemyShip;
      currentDefender = hero;
    } else {
      currentPlayer = hero;
      currentDefender = enemyShip;
    }
  }
  
  function playRound(i) {
    const roundInfo = document.createElement("li");
    roundInfo.innerHTML = `-------------------- Round ${i} --------------------`;
    roundList.appendChild(roundInfo);
  
    while (currentPlayer.hull > 0 && currentDefender.hull > 0) {
      currentPlayer.attack(currentDefender);
      if (currentDefender.hull <= 0) {
        break;
      }
      switchTurn();
    }
  
    const winnerInfo = document.createElement("li");
    winnerInfo.innerHTML = `Winner of Round ${i} is ${currentPlayer.name} with ${currentPlayer.hull} HP remaining`;
    roundList.appendChild(winnerInfo);
    console.log(
      `Round ${i} Winner: ${currentPlayer.name} HP: ${currentPlayer.hull}`
    );
  
    if (currentDefender.hull <= 0) {
      enemyShip = createEnemyShip();
      currentDefender = enemyShip;
    }
  
    roundNumber++;
  }
  