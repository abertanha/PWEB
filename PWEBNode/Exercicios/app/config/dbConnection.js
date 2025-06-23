let sql = require ('mssql');
    
let connSQLServer = function(){
    const sqlConfig = {
        user: 'BD2321026', //7 últimos dígitos do seu RA
        password: 'cr1571@n0',
        database: 'LP2', 
        server: 'APOLO',
        options: {
            encrypt: false,
            trustServerCertificate: true,
        }
    }
    return sql.connect(sqlConfig);
}

module.exports = function(){
    console.log('O autoload carregou o módulo de conexão com o bd');
    return connSQLServer;
}
        