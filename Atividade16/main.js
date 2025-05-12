const cursos = document.getElementById("cursos");

function exibirCursoSelecionado() {
  const curso = cursos.options[cursos.selectedIndex].value;
  const cursoTexto = cursos.options[cursos.selectedIndex].text;
  if (confirm(`Você selecionou o curso de ${cursoTexto}. Deseja continuar?`)) {
    window.open(
      `https://fatecsorocaba.cps.sp.gov.br/cursos-fatec/${curso}/`,
      "_blank",
      "width=600,height=300"
    );
  } else {
    cursos.focus();
  }

  cursos.selectedIndex = 0;
  cursos.blur();
  cursos.focus();
}
