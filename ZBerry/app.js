
/**
 * Module dependencies.
 */

    // libraries
var express = require('express'),
    stylus = require('stylus');

var zberry = require('./server/zberry_mock.js');

// Controllers
var routes = require('./server/routes');
var status = require('./server/routes/status');

// Web server
var http = require('http');
var path = require('path');


var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

app.use(stylus.middleware(
    {
      src:      __dirname + '/public',
      compile:  compile
    }
));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/partials/:partialPath', function(req, res){
  res.render('partials/' + req.params.partialPath);
});

app.get('/', routes.index);
app.get('/status', status.getStatus);

zberry.demo();

http.createServer(app).listen(app.get('port'), function(){
  console.log("Hello world!")
  console.log('Express server listening on port ' + app.get('port'));
});
