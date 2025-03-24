let numeros ={
    numero1: null,
    numero2: null
};
numeros.numero1 = parseFloat(prompt("no1"));
numeros.numero2 = parseFloat(prompt("no2"));
alert(`soma: ${numeros.numero1 + numeros.numero2}`);
alert(`subtração: ${numeros.numero1 - numeros.numero2}`);
alert(`produto: ${numeros.numero1 * numeros.numero2}`);
alert(`divisao: ${numeros.numero1 / numeros.numero2}`);
alert(`resto: ${numeros.numero1 % numeros.numero2}`);