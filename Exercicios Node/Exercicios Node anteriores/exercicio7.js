let http = require("http");
let server = http.createServer(function(req,res){
    let opcao = req.url;
    if(opcao=='/historia') res.end("<html><body>Historia da fatec Sorocaba</body></html>");
    else if(opcao=='/cursos') res.end("<html><body>Cursos da fatec Sorocaba</body></html>");
    else if(opcao=='/professores') res.end("<html><body>Professores da fatec Sorocaba</body></html>");
    else res.end("<html><body>Site da Fatec sorocaba</body></html>");
});

server.listen(3000);