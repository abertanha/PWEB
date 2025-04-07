let btnEnviar = document.getElementById('btnEnviar');
let btnLimpar = document.getElementById('btnLimpar');
var banco = {sexo : [],
             idade: [],
             opiniao: [],
};

btnEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    let pesquisa = document.getElementById('pesquisa');
    let parametros = new FormData(pesquisa);
    let entradas = Object.fromEntries(parametros.entries());
    let total = 0;
    
    banco.sexo.push(entradas.sexo);
    banco.idade.push(entradas.idade);
    banco.opiniao.push(entradas.opiniao);
    pesquisa.reset();

    document.getElementById('avg').innerText = banco.idade.map((idade) => {
        total += parseInt(idade);        
        return total/banco.idade.length;
    });
    document.getElementById('older').innerText = (Math.max.apply(null, banco.idade));
    document.getElementById('younger').innerText = (Math.min.apply(null, banco.idade));
    document.getElementById('worse').innerText = (Math.max.apply(null, banco.opiniao));
    document.getElementById('goodgreat').innerText = (Math.max.apply(null, banco.opiniao));
});

btnLimpar.addEventListener('click', () => {
    if(confirm('Você tem certeza que quer limpar?')) {
        pesquisa.reset();
    }
})






