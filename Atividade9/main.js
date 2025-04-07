// função 1
document.getElementById("btnEnviar1").addEventListener("click", () => {
  const nums = [
    parseFloat(document.getElementById("num1_1").value),
    parseFloat(document.getElementById("num1_2").value),
    parseFloat(document.getElementById("num1_3").value),
  ];

  const maior = Math.max(...nums);
  document.getElementById("resultMaior").textContent = `Maior número: ${maior}`;
});

// função 2
document.getElementById("btnEnviar2").addEventListener("click", () => {
  const nums = [
    parseFloat(document.getElementById("num2_1").value),
    parseFloat(document.getElementById("num2_2").value),
    parseFloat(document.getElementById("num2_3").value),
  ].sort((a, b) => a - b);

  document.getElementById(
    "resultCrescente"
  ).textContent = `Ordenados: ${nums.join(", ")}`;
});

// função 3
document.getElementById("btnEnviar3").addEventListener("click", () => {
  const texto = document
    .getElementById("palindromo")
    .value.toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const reverso = texto.split("").reverse().join("");
  const resultado = texto === reverso ? "É palíndromo!" : "Não é palíndromo.";

  document.getElementById("resultPalindromo").textContent = resultado;
});

// função 4
document.getElementById("btnEnviar4").addEventListener("click", () => {
  const lados = [
    parseFloat(document.getElementById("tri1").value),
    parseFloat(document.getElementById("tri2").value),
    parseFloat(document.getElementById("tri3").value),
  ].sort((a, b) => a - b);

  let resultado = "";

  if (lados[0] + lados[1] > lados[2]) {
    if (lados[0] === lados[1] && lados[1] === lados[2]) {
      resultado = "Equilátero";
    } else if (lados[0] === lados[1] || lados[2] === lados[1]) {
      resultado = "Isósceles";
    } else {
      resultado = "Escaleno";
    }
  } else {
    resultado = "Não forma um triângulo";
  }

  document.getElementById("resultTriangulo").textContent = resultado;
});

// função limpar
document.querySelectorAll(".btn-limpar").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement
      .querySelectorAll("input")
      .forEach((input) => (input.value = ""));
    btn.parentElement.querySelector(".resultado").textContent = "";
  });
});
