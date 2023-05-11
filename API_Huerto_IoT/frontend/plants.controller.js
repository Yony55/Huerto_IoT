var mysql = require('mysql');
var config = require('../helpers/config');
var connection = mysql.createConnection(config);

module.exports.plants_list = (request, response) => {
    var sql = 'SELECT * FROM plants';
    connection.query(sql, (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.get_plants = (request, response) => {
    var sql = 'SELECT * FROM plants WHERE idPlant = ?';
    connection.query(sql, [request.params.idPlant], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
};

module.exports.insert_plants = (request, response) => {
    var plants = request.body;
    var sql = 'INSERT INTO plants SET ?';
    connection.query(sql, [plants], (error, results, fields) => {
        if(error){
            response.send(error)
        }
        response.json(results)
    });
}