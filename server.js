var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var bodyParser = require('body-parser');
var pool = require('./modules/pool');
var index = require('./routes/index');
var tasks = require('./routes/tasks');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', index);
app.use('/tasks', tasks);

app.listen(port, function () {
    console.log('listening on port', port);
});