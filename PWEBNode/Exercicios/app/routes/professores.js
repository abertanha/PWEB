// para acessar o arquivo de config
//let dbConnection = require('../config/dbConnection'); // foi pro server

module.exports = function(app){
    app.get('/informacao/professores', function(req,res){

        async function getProfessores() {
            try {
                let connection = app.config.dbConnection;
                const pool = await connection();

                let professoresModel = app.models.professorModel;
  
                // executar a funcao - tem que passar a conexao e o callback
                professoresModel.getProfessores(pool, function(error,results){
                    if (error){
                        console.error("Erro ao buscar professores:", error);
                        return res.status(500).send("Erro no servidor");    
                    }
                    if(!results || !results.recordset){
                        console.warn("Nenhum resultado encontrado ou formato inesperado", results);
                        return res.status(404).send("Nenhum professor encontrado.")
                    }
                    res.render('informacao/professores',{profs:results.recordset});
                });     
            } catch (err) {
                console.log(err)
            }
        }
       getProfessores();
    });
 }