var mysql = require('mysql');
var config = require('../helpers/config');
var connection = mysql.createConnection(config);

module.exports.dht11_list = (request, response) => {
    var sql = 'SELECT * FROM dht11';
    connection.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.get_dht11 = (request, response) => {
    var sql = 'SELECT * FROM dht11 WHERE idPlant = ?';
    connection.query(sql, [request.params.idDHT11], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.insert_dht11 = (request, response) => {
    var dht11 = request.body;

    var today = new Date();
    var utcOffset = today.getTimezoneOffset();
    today.setMinutes(today.getMinutes()+utcOffset);
    var mexicoOffset = -6 * 60;
    today.setMinutes(today.getMinutes() + mexicoOffset);
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    }
    date = yyyy+'-'+mm+'-'+dd; 

    var sql = "INSERT INTO dht11 SET ?, dateDHT11 = '" + date + "'" + ", timeDHT11 = '" + time + "'";
    connection.query(sql, [dht11], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
}