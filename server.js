var express = require('express');
var http = require('http');
var exec = require('child_process').exec;

const keyless_location = ["~/.ssh/foo"]
const ips = ["root@127.0.1.1"]

var app = express();

var server = http.createServer(app).listen(8888);

app.use("/", express.static("./"));

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('restart', function() {
    for (let i = 0; i < ips.length; i++) {
      console.log('ssh -i ' + keyless_location[i] + ' ' + ips[i] + ' /sbin/shutdown -r now');
      exec('ssh -i ' + keyless_location[i] + ' ' + ips[i] + ' /sbin/shutdown -r now', (error, stdout, stderr) => {
        console.log('stderr: ' + stderr);
        console.log('stdout: ' + stdout);  
      });
    }
  });
  socket.on('disconnect', function() {
    console.log('bye');
  })
})