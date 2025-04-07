let btnEnviar = document.getElementById("btnEnviar");
let btnLimpar = document.getElementById("btnLimpar");
let btnLimparBanco = document.getElementById("btnLimparBanco");
const pesquisa = document.getElementById("pesquisa");
let banco = { sexo: [], idade: [], opiniao: [] };

// função isolada das estatísticas
const atualizarEstatisticas = () => {
  // calculo da média
  const totalIdades = banco.idade.reduce(
    (acc, idade) => acc + parseInt(idade),
    0
  );
  const media =
    banco.idade.length > 0 ? (totalIdades / banco.idade.length).toFixed(1) : 0;
  document.getElementById("avg").innerText = media;

  // +velho e +jovem
  let oldest = banco.idade.length > 0 ? Math.max(...banco.idade) : "0";
  let youngest = banco.idade.length > 0 ? Math.min(...banco.idade) : "0";
  document.getElementById("older").innerText = oldest;
  document.getElementById("younger").innerText = youngest;

  // péssimos
  const pessimo = banco.opiniao.filter((op) => op === "1");
  document.getElementById("worse").innerText = pessimo.length;

  // bons e ótimos
  const totalOpinioes = banco.opiniao.length;
  const bonsOtimos = banco.opiniao.filter(
    (op) => op === "3" || op === "4"
  ).length;
  const valRelativo =
    totalOpinioes > 0
      ? ((bonsOtimos / totalOpinioes) * 100).toFixed(1) + "%"
      : "0 %";
  document.getElementById("goodgreat").innerText = valRelativo;

  // contagem de sexos
  const homens = banco.sexo.filter((sexo) => sexo === "m").length;
  const mulheres = banco.sexo.filter((sexo) => sexo === "f").length;
  document.getElementById(
    "genderCount"
  ).innerHTML = `Homens: ${homens} | Mulheres: ${mulheres}`;
};

// resposta a eventos do html
pesquisa.addEventListener("submit", (event) => {
  event.preventDefault();

  const dados = new FormData(pesquisa);
  const entrada = Object.fromEntries(dados.entries());

  if (!entrada.idade || isNaN(entrada.idade) || entrada.idade < 0) {
    alert("Insira uma idade válida");
    pesquisa.reset();
    return;
  }

  banco.sexo.push(entrada.sexo);
  banco.idade.push(entrada.idade);
  banco.opiniao.push(entrada.opiniao);

  pesquisa.reset();

  atualizarEstatisticas();
});

btnLimpar.addEventListener("click", () => {
  if (confirm("Você tem certeza que quer limpar essa entrada?")) {
    pesquisa.reset();
  }
});

btnLimparBanco.addEventListener("click", () => {
  if (confirm("Você tem certeza que quer limpar todos os dados?")) {
    banco = { sexo: [], idade: [], opiniao: [] };
    pesquisa.reset();
    atualizarEstatisticas();
  }
});
