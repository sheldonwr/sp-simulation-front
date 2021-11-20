var express = require('express');
const http = require('http');
const { Server } = require("socket.io");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const PORT = 8888;

const server = http.createServer(app);
const io = new Server(server);
const clients = [];

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scene')));

app.get('/', function(req, res) {
  res.sendFile('./scene/index.html');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

io.on('connection', (socket) => {
  clients.push(socket);
  console.log('connected');

  let positive = 1;
  setInterval(() => {
    socket.emit('data.get', { in1: 1000 * positive });
    positive = -positive;
  }, 100);
});

server.listen(PORT);

module.exports = app;
