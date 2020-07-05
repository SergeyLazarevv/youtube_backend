var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let videoGet = require('./api/youtubeVideosGetApi');
var indexRouter = require('./routes/index');
var videosRouter = require('./routes/videos');
let fs = require("fs");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//update data file every 24h
setInterval(function() {
  videoGet().then(function(data) {
    //save data in data.txt
    fs.writeFile("data.txt", JSON.stringify(data), function(){
      console.log('data file has been updated...')
    });
  });
}, 86400000);

app.use('/', indexRouter);
app.use('/videos', videosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
