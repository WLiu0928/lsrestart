var express = require('express');
var exec = require('child_process').exec;
var cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(cors());

app.get('/', function(req, res) {
    res.send('Online');
});

app.get('/restart', function(req, res) {
    res.send('Restarting');
    exec('sudo /sbin/reboot')
});

app.get('/shutdown', function(req, res) {
    res.send('Shutting Down');
    exec('sudo /sbin/shutdown now')
});

app.listen(app.get('port'));