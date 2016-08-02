var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var storage = [];
var app = express();
app.set("port", process.env.PORT || 3000);

// Use the session middleware
app.use(session({
                   secret:'oneir cloud', 
                   cookie: { maxAge : 600000000 },
                   resave: true,
                   saveUninitialized: true
                }));
 

var routes = require('./routes/index');
var users = require('./routes/users');
var inventory = require('./routes/inventory');
var api = require('./routes/api');
var menu = require('./routes/menu');
var login_check = require('./routes/login_check');
var oneir_session_login = require('./routes/oneir_session_login');
var login_check = require('./routes/login_check');
var oneir_logout = require('./routes/oneir_logout');
var oneir_commands = require('./routes/oneir_commands');
var oneir = require('./routes/oneir');
var oneir_session_name = require('./routes/oneir_session_name');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//app.set("view engine","ejs");


app.use('/', routes);
app.use('/users', users);
app.use('/inventory', inventory);
app.use('/api', api);

app.use('/menu', menu);
app.use('/login_check', login_check);
app.use('/oneir_session_login', oneir_session_login);
app.use('/login_check', login_check);
app.use('/oneir_logout', oneir_logout);
app.use('/oneir_commands', oneir_commands);
app.use('/oneir', oneir);
app.use('/oneir_session_name', oneir_session_name);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/* initializing rethinkdb*/


module.exports = app;


