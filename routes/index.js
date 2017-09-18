var router = require('express').Router();
var path = require('path');
// var bodyParser = require('body-parser');

router.get('/', function (req, res) {
    console.log('sending / to DOM');
    var indexPath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(indexPath);
});

module.exports = router;