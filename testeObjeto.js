let a1 = new Object();

a1.ra = "00000";
a1.nome = "Robs";
console.log(`ra=${a1.ra} nome=${a1.nome} ${typeof(a1)}`);

let a2 = {};
a2.ra = "123124"
a2["nome"] = "roberto";
a2["email do aluno"] = "a@a.com"
console.log(`ra=${a2.ra} nome=${a2.nome} email=${a2["email do aluno"]}`);

let a3 = {ra:"12345",nome:"Adriano"};

console.log(`ra=${a3.ra} nome=${a3.nome}`);

function Aluno(ra, nome) {
    this.ra = ra;
    this.nome = nome;
    this.mostraDados  = () => `ra=${this.ra} nome=${this.nome}`;
}
let a4 = new Aluno("10532","Murilo");
console.log(a4.mostraDados());

let a5 = {};
let nome_propriedade = "ra";
a5[nome_propriedade] = "123";
a5['nome'] = "Maria Gabriela";
console.log(`ra=${a5.ra} nome=${a5.nome}`);

function Aluno2() {
    let ra;
    let nome;
    this.setRa = (ra) => {
        this.ra = ra;
    }
    this.getRa = () => this.ra;
    this.setNome = (nome) => {
        this.nome = nome;
    }
    this.getNome = () => this.nome
}
let a6 = new Aluno2();
a6.setNome("Pasquale");
a6.setRa("10000000000000");

console.log(`ra=${a6.getRa()} nome=${a6.getNome()}`);

function AlunoADS() {
    let numLab;
    this.setNumLab = (num) =>{
        this.numLab = num;
    }
    this.getNumLab = () => this.numLab;
}

AlunoADS.prototype = new Aluno2();
let a7 = new AlunoADS();
a7.setNome('Roberto');
a7.setRa('10123123213');
a7.setNumLab(123);
console.log(`ra=${a7.getRa()} nome=${a7.getNome()} numLab=${a7.getNumLab()}`);

const arr = [['codigo',1],['nome',"jao"],['idade',23]];
const obj = Object.fromEntries(arr);
console.log(`codigo=${obj.codigo} nome=${obj.nome} idade=${obj.idade}`);
console.log(JSON.stringify(obj));

class OutroAluno {
    constructor(){
        this._ra;
        this._nome;
    }
    setNome(nome){
        this._nome = nome;
    }
    getNome() {
        return this._nome;
    }
    setRa(ra) {
        this._ra = ra;
    }
    getRa() {
        return this._ra;
    }
}

let objAluno = new OutroAluno();

objAluno.setNome("Denilce");
objAluno.setRa('123');

console.log(`ra=${objAluno.getRa()}
             nome=${objAluno.getNome()}`);

class OutroAlunoADS extends OutroAluno {
    constructor(){
        super();
        this._numLab;
    }
    setNumLab(value){
        this._numLab = value;
    }
    getNumLab() {
        return this._numLab;
    }
}

let objAlunoAds = new OutroAlunoADS();

objAlunoAds.setNumLab("6");
objAlunoAds.setNome("Mateus")
objAlunoAds.setRa("12312");

console.log(`ra=${objAlunoAds.getRa()} nome=${objAlunoAds.getNome()} Laboratório=${objAlunoAds.getNumLab()}`);

//metodos e atributos -publicos e privados

class ContaBancaria {
    #cpf;
    constructor(nome, saldoInicial) {
        this.nome = nome;
        this.saldo = saldoInicial;
    }
    setCpf(cpf){
        this.cpf = cpf;
    }
    getCpf() {
        return this.cpf;
    }
    getSaldo() {
        return this.saldo;
    }
    depositar(valor){
        this.saldo += valor;
        this.#registrarTransacao(valor);
    }
    #registrarTransacao(valor){
        console.log(`Depósito de R$ ${valor} realizado.
            Saldo R$ ${this.saldo} para o CPF: ${this.getCpf()}`);
    }
}

const conta = new ContaBancaria("Carlos", 345.00);
conta.setCpf(11122233344);
conta.depositar(58);

const objEmpresa = { empresa: 'ZF do Brasil'};
const funcionario = Object.create(objEmpresa, {nome: { value: 'José Carlos'},
                                              endereco: { value: 'Av. Sao joao'}});
console.log(funcionario.empresa);
console.log(funcionario.nome);
console.log(funcionario.endereco);

const objNovaEmpresa = { empresa: 'ZF do Brasil '};
const objVeiculo = { placa: 'XXX 1234'};
const motorista = Object.assign({cpf: "11122233344 "}, objNovaEmpresa, objVeiculo);
console.log(motorista);