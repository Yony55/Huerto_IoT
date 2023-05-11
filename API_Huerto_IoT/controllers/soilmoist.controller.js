var mysql = require('mysql');
var config = require('../helpers/config');
var connection = mysql.createConnection(config);

module.exports.soilmoist_list = (request, response) => {
    var sql = 'SELECT * FROM soilMoisture';
    connection.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.get_soilmoist = (request, response) => {
    var sql = 'SELECT * FROM soilMoisture WHERE idPlant = ?';
    connection.query(sql, [request.params.idSoilMoistureSensor], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.insert_soilmoist = (request, response) => {
    var soilMoist = request.body;

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

    var sql = "INSERT INTO soilMoisture SET ?, dateSoil = '" + date + "'" + ", timeSoil = '" + time + "'";
    connection.query(sql, [soilMoist], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
}