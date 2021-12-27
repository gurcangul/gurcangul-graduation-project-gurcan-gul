var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var dbConnect = require('./src/common/dbConfig');

var app = express();

var port = Number(process.env.PORT || 3000);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
dbConnect();

require('./src/router')(app);

app.get('/', (req, res) => {
  res.send(`<h2>Welcome!!!</h2>`)
});

app.listen(port, function () {
  console.log("Server listening on port " + port);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
