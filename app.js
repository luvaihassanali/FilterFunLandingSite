var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var Ddos = require('ddos');
var ddos = new Ddos;
var expectCt = require('expect-ct');
var compression = require('compression');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');

var app = express();
app.use(compression());
//app.use(ddos.express);
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"]
  }
}));
app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))
app.use(helmet.contentSecurityPolicy({
  directives: {
    'default-src': ["'none'"],
    'object-src': ["'none'"],
    'script-src': ["'self'", "'nonce-2726c7f26c'", "'unsafe-inline'"],
    'connect-src': ["'self'", (req, _res) => (req.protocol === 'http' ? 'ws://' : 'wss://') + req.get('host')],
    'manifest-src': ["'self'"],
    'worker-src': ["'self'"],
    'style-src': ["'self'", "'nonce-2726c7f26d'"],
    'font-src': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'report-uri': '/report-violation',
    'frame-src': ['https://www.youtube-nocookie.com']
  },
  reportOnly: false
}));

app.use(expectCt({ enforce: true, maxAge: 604800 }));
var corsOps = {
  origin: 'https://filterfun.fun',
  optionsSuccessStatus: 200
}
app.use(cors(corsOps));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: "30d"
}));

app.use('/', indexRouter);

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
