function randomJoken() {
  const choices = ["Papel", "Pedra", "Tesoura"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}
function getDropdownValue() {
  let dropdown = document.getElementById("values");
  return dropdown.value;
}
function game() {
  const winConditions = {
    Pedra: "Tesoura",
    Tesoura: "Papel",
    Papel: "Pedra",
  };

  let player = getDropdownValue();

  let computer = randomJoken();

  document.getElementById("computer-choice").textContent = computer;
  document.getElementById("player-choice").textContent = player;

  if (player === computer) {
    alert(`EMPATE!!! Ambos escolheram ${player}.`);
    return;
  }

  if (winConditions[player] === computer) {
    alert(`VITÓRIA! ${player} vence ${computer}!`);
  } else {
    alert(`DERROTA! ${computer} derrota ${player}!`);
  }
  document.getElementById("values").value = "";
}
