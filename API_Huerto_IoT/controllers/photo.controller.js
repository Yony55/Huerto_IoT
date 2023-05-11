var mysql = require('mysql');
var config = require('../helpers/config');
var connection = mysql.createConnection(config);

module.exports.photo_list = (request, response) => {
    var sql = 'SELECT * FROM photoresistor';
    connection.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.get_photo = (request, response) => {
    var sql = 'SELECT * FROM photoresistor WHERE idPlant = ?';
    connection.query(sql, [request.params.idPhotoresistor], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.insert_photo = (request, response) => {
    var photo = request.body;

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

    var sql = "INSERT INTO photoresistor SET ?, datePhoto = '" + date + "'" + ", timePhoto = '" + time + "'";
    connection.query(sql, [photo], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
}