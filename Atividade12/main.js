function Retangulo(x,y){
    this.x = x;
    this.y = y;
    this.calcArea = () => {
        return this.x * this.y;
    };
};


document.getElementById("btnEnviar0").addEventListener("click", () => {
    const values = [
        parseInt(document.getElementById("num1").value),
        parseInt(document.getElementById("num2").value),
      ];
    const objRet = new Retangulo(values[0], values[1]);
    document.getElementById("resultRetangulo").textContent = `Area= ${objRet.calcArea()} m²`
});

class Conta{
    constructor(){
        this.nomeCorrentista;
        this.banco;
        this.numeroConta;
        this.saldo;
    }
    getNomeCorrentista(){
        return this.nomeCorrentista;
    }
    getBanco(){
        return this.banco;
    }
    getNumeroConta(){
        return this.numeroconta;
    }
    getSaldo(){
        return this.saldo;
    }
    setNomeCorrentista(nome){
        this.nomeCorrentista = nome;
    }
    setBanco(banco){
        this.banco = banco;
    }
    setNumeroConta(numeroConta){
        this.numeroConta = numeroConta;
    }
    setSaldo(saldo){
        this.saldo = saldo;
    }
}

class ContaCorrente extends Conta {
    constructor(){
        super();
        this.saldoEspec;
    }
    getSaldoEspec(){
        return this.saldoEspec;
    }
    setSaldoEspec(saldoEspec){
        this.saldoEspec = saldoEspec;
    }
}

class ContaPoupanca extends Conta {
    constructor(){
        super();
        this.juros;
        this.dataVenc;
    }
    getJuros(){
        return this.juros;
    }
    setJuros(juros){
        this.juros = juros;
    }
    getDataVenc(){
        return this.dataVenc;
    }
    setDataVenc(dataVenc){
        this.dataVenc = dataVenc;
    }
}

objContaCorrente = new ContaCorrente();
document.getElementById("btnEnviar1").addEventListener("click", () => {
    const values = [
        document.getElementById("str1_1").value,
        document.getElementById("str1_2").value,
        parseInt(document.getElementById("num1_1").value),
        parseFloat(document.getElementById("num1_2").value),
        parseFloat(document.getElementById("num1_3").value),
      ];
    objContaCorrente.setNomeCorrentista(values[0]);
    objContaCorrente.setBanco(values[1]);
    objContaCorrente.setNumeroConta(values[2]);
    objContaCorrente.setSaldo(values[3]);
    objContaCorrente.setSaldoEspec(values[4]);

    document.getElementById("resultContaCorrente").textContent = `nome= ${objContaCorrente.getNomeCorrentista()}
    Banco=${objContaCorrente.getBanco()}
    Numero da Conta=${objContaCorrente.getNumeroConta()}
    Saldo=${objContaCorrente.getSaldo()}
    Saldo especial=${objContaCorrente.getSaldoEspec()}`
});

objContaPoupanca = new ContaPoupanca();

document.getElementById("btnEnviar2").addEventListener("click", () => {
    const values = [
        document.getElementById("txt2_1").value,
        document.getElementById("txt2_2").value,
        parseInt(document.getElementById("num2_1").value),
        parseFloat(document.getElementById("num2_2").value),
        parseFloat(document.getElementById("num2_3").value),
        document.getElementById("date2_1").value
      ];
    objContaPoupanca.setNomeCorrentista(values[0]);
    objContaPoupanca.setBanco(values[1]);
    objContaPoupanca.setNumeroConta(values[2]);
    objContaPoupanca.setSaldo(values[3]);
    objContaPoupanca.setJuros(values[4]);
    objContaPoupanca.setDataVenc(values[5]);

    document.getElementById("resultContaPoupanca").textContent = `nome= ${objContaPoupanca.getNomeCorrentista()}
    Banco=${objContaPoupanca.getBanco()}
    Numero da Conta=${objContaPoupanca.getNumeroConta()}
    Saldo=${objContaPoupanca.getSaldo()}
    Juros=${objContaPoupanca.getJuros()}
    Data Vencimento=${objContaPoupanca.getDataVenc()}`
});