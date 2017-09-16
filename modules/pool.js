var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port: 5432,
    database: 'todo_app',
    max: 20
};

var todoPool = new Pool(config);

module.exports = todoPool