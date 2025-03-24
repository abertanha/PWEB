var nomeAluno = "";
        var aluno = {
            nota1: 0,
            nota2: 0,
            nota3: 0,
            nota4: 0,
        };
        nomeAluno = prompt("Insira seu nome: ");
        aluno.nota1 = parseFloat(prompt("Insira sua nota 1: "));
        aluno.nota2 = parseFloat(prompt("Insira sua nota 2: "));
        aluno.nota3 = parseFloat(prompt("Insira sua nota 3: "));
        aluno.nota4 = parseFloat(prompt("Insira sua nota 4: "));
        
        let notaTotal = 0;
        
        let notas = Object.values(aluno);
        let soma = notas.reduce((acc, value) => acc += value, 0);
        let avg = soma / notas.length;

        alert(`Aluno: ${nomeAluno}\nMedia final: ${avg}`);