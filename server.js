var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var bodyParser = require('body-parser');
var pool = require('./modules/pool');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function(){
    console.log('listening on port', port);
})

app.get('/', function(req, res){
    console.log('sending / to DOM');
    var indexPath = path.join(__dirname, '/./public/views/index.html');
    res.sendFile(indexPath);
});

app.get('/tasks', function(req, res){
    console.log('in get / response function');
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
        } else {
            client.query('SELECT * FROM todos', function(queryError, resultsObj) {
                done();
                if(queryError) {
                    console.log(connectionError);
                    res.sendStatus(500); 
                } else {
                    console.log('resultobj.rows: ', resultsObj.rows);
                    res.send(resultsObj.rows);
                }
            });
        }
    });
});

app.post('/tasks', function(req, res) {
    var task = req.body;
    console.log('in post / response function', task); 
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            var queryString = 'INSERT INTO todos (task) VALUES ($1);';
            var values = [task];
            client.query(queryString, values, function(queryError, resultsObj){
                done();
                if(queryError) {
                    console.log(connectionError);
                    res.sendStatus(500);
                } else {
                    console.log('resultsObj: ', resultsObj);
                    res.sendStatus(201);
                }
            });
        }
    });
});