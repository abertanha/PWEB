class Funcionario1 {
    constructor(matricula, nome, funcao){
        this.matricula = matricula;
        this.nome = nome;
        this.funcao = funcao;
    }
    getMatricula(){
        return this.matricula;
    }
    getNome(){
        return this.nome;
    }
    getFuncao(){
        return this.funcao;
    }
}

function Funcionario11() {
    let nome;
    let matricula;
    let funcao;
    this.setNome = (nome) => {
        this.nome = nome;
    }
    this.setMatricula = (matricula) => {
        this.matricula = matricula;
    }
    this.setFuncao = (funcao) => {
        this.funcao = funcao;
    }
    this.getNome = () => this.nome;
    this.getMatricula = () => this.matricula;
    this.getFuncao = () => this.funcao;
}

const objFunc1 = new Funcionario1("1010","Andre","Empregado");
const objFunc2 = {
    matricula: "1010",
    nome: "Andre",
    funcao: "Empregado"                
};

const objFunc3 = new Funcionario11();
objFunc3.setFuncao("Empregado");
objFunc3.setNome("Andre");
objFunc3.setMatricula("1010");

console.log(`1: nome=${objFunc1.getNome()} matricula=${objFunc1.getMatricula()} funcao=${objFunc1.getFuncao()}`);
console.log(`2: nome=${objFunc2.nome} matricula=${objFunc2.matricula} funcao=${objFunc2.funcao}`);
console.log(`3: nome=${objFunc3.getNome()} matricula=${objFunc3.getMatricula()} funcao=${objFunc3.getFuncao()}`);


