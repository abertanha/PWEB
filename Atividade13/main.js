const janela = document.getElementById("window");
    
janela.addEventListener("mouseover", (elemento) => {
    if(elemento.target.nodeName.toLowerCase() === "img"){
        janela.src = "./janelaaberta.jpeg";
    }
});
janela.addEventListener("mouseout", function(img){
    if(img.target.nodeName.toLowerCase() === "img"){
        janela.src = "./janelafechada.jpg";
    }
});
janela.addEventListener("click", function(img){
    if(img.target.nodeName.toLowerCase() === "img"){
        janela.src = "./janelaquebrada.jpg";
    }
});