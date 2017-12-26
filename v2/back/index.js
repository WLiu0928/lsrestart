var express = require('express');
var exec = require('child_process').exec;
var cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(cors());

app.get('/', function(req, res) {
    res.send('online');
});

app.get('/restart', function(req, res) {
    exec('sudo /sbin/reboot')
});

app.listen(app.get('port'));