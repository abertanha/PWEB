document.getElementById("calcular").addEventListener("click", () => {
    const nums = [
      parseFloat(document.getElementById("alt").value),
      parseFloat(document.getElementById("peso").value)
    ];
    
    const result = (nums[1]/Math.pow(nums[0], 2));
    let msg = "";
    if(result < 18.5) 
        msg += "MAGREZA";
    else if(result > 18.5 &&  result < 25)
        msg += "NORMAL";
    else if(result > 24.9 && result < 30)
        msg += "SOBREPESO";
    else if(result > 29.9 && result < 40)
        msg += "OBESIDADE";
    else
        msg += "OBESIDADE GRAVE";
    
    document.getElementById("resultado").textContent = `IMC: ${result.toFixed(2)} ${msg}`;
  });