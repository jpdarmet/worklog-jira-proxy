var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var http = require('http').Server(app);
var JiraCtrl = require('./controllers/JiraCtrl');

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(methodOverride());

console.log("starting...");

var controllers = {
    jira: new JiraCtrl(app),
};

app.route('/jira/query').get(controllers.jira.findFromQuery);


http.listen(config.env.port, function () {
    console.log("Express server listening on port %d in %s mode", config.env.port, app.settings.env);
    console.log("Successfully started web server. Waiting for incoming connections...");
});