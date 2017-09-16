var express = require('express');
var app = express();
var port = 3000;
var path = require('path');

app.use(express.static('public'));

app.listen(port, function(){
    console.log('listening on port', port);
})

app.get('/', function(req, res){
    console.log('sending / to DOM');
    var indexPath = path.join(__dirname, '/./public/views/index.html');
    res.sendFile(indexPath);
});