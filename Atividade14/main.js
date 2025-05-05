const inputTexto = document.getElementById("txt1");
const btnUpper = document.getElementById("btnUpper");
const btnLower = document.getElementById("btnLower");

btnUpper.addEventListener("change", () => {
    if(btnUpper.checked){
        inputTexto.value = inputTexto.value.toUpperCase();
    }
});

btnLower.addEventListener("change", () => {
    if(btnLower.checked){
        inputTexto.value = inputTexto.value.toLowerCase();
    }
});