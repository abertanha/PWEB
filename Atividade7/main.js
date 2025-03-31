var options = Enumerator = {
    PEDRA: "pedra",
    PAPEL: "papel",
    TESOURA: "tesoura",
};
function game(){
    function getDropdownValue() {
        let dropdown = document.getElementById("values")
        let selectedValue = dropdown.options[dropdown.selectedIndex].text;
        return selectedValue;  
    }


    function randomJoken(){
        return (Math.random() > 0.66) ? "Papel" : (Math.random() < 0.33) ? "Tesoura": "Pedra";
    }

    let player = getDropdownValue();
    console.log(player);

    let computer = randomJoken();
    console.log(computer);

    if(player === computer){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n EMPATE!!!!`);
    }
    else if (options.PAPEL === player){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n DERROTA!!!!`);
    }
    else if(options.PAPEL === computer){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n VITÓRIA!!!!`);
    }
    else if(options.TESOURA === computer && options.PEDRA === player){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n VITÓRIA!!!!`);
    }
    else if(options.PEDRA === computer && options.PAPEL === player){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n VITÓRIA!!!!`);
    }
    else if(options.TESOURA === player && options.PEDRA === computer){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n DERROTA!!!!`);
    }
    else if(options.PEDRA === player && options.PAPEL === computer){
        alert(`O jogador colocou ${player} e a máquina colocou ${computer}\n DERROTA!!!!`);
    }

}