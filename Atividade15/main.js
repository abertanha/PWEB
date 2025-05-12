const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
document.getElementById("submit").addEventListener("click", () => {
    const value = [
      document.getElementById("name").value,
      document.getElementById("email").value,
      document.getElementById("comment").value,
    ];
    const radioYes = document.getElementById("btnYes");
    const radioNo = document.getElementById("btnNo");
    
    if (value[0].length < 10){
        alert("O nome precisa ter no mínimo 10 caracteres!");
        document.getElementById("name").value = "";
        document.getElementById("name").focus();
    }
    if(!validateEmail(value[1])){
        alert("Insira um email válido");
        document.getElementById('email').value = "";
        document.getElementById('email').focus();
    }
    if (value[2].length < 30){
        alert("O comentário precisa ter no mínimo 30 caracteres!");
        document.getElementById("comment").focus();
    }
    if(radioYes.checked){
        document.getElementById("resultado").textContent = "Volte sempre à esta página";
    }
    else if(radioNo.checked){
        document.getElementById("resultado").textContent = "Que bom que você voltou a visitar a página";
    }else{
        alert("Você precisa responder a pesquisa!")
        document.getElementById("btnYes").focus();
    }
  });