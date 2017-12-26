var express = require('express');
var exec = require('child_process').exec;

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
    exec('sudo /sbin/shutdown -r now')
});

app.listen(app.get('port'));