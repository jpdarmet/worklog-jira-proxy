/**
 *   JiraCtrl
 */

var https = require('https');
var qs = require('querystring');
var fs = require('fs');

var config = require('../config');

module.exports = function JiraCtrl(app) {

    return {
        findFromQuery: function (req, res) {

            //encode login/password to base64
            var authentication = new Buffer(config.credentials.username + ':' + config.credentials.password).toString('base64');

            //set params for url
            var params = {
                jql: req.query.jql,
                startAt: 0,
                maxResults: 5000,
                fields: req.query.fields,
                expand: req.query.expand
            };

            //set options for url
            var options = {
                hostname: config.jira.host,
                port: config.jira.port,
                path: config.jira.path + "?" + qs.stringify(params),
                method: 'GET',
                headers: {
                    "Authorization": "Basic " + authentication,
                    "Content-Type": "application/json;charset=UTF-8"
                },
                cert: fs.readFileSync(config.jira.certificateLocation),
                agent: false
            };

            //call https request
            var requestHTTPS = https.request(options, function (responseHTTPS) {
                //send response if status is not 200 OK
                if (responseHTTPS.statusCode != 200) {
                    res.status(responseHTTPS.statusCode);
                    res.send(responseHTTPS.statusCode);
                    return;
                }

                //get response parts and store it in chunks array
                var chunks = [];
                responseHTTPS.on('data', function (chunk) {
                    chunks.push(chunk);
                });

                //send response when all parts have been retrieved
                responseHTTPS.on('end', function () {
                    var data = new Buffer.concat(chunks);
                    res.send(data);
                });
            });

            //handle error
            requestHTTPS.on('error', function (err) {
                console.error(err);
                res.status(500);
                res.send(err);
            });

            requestHTTPS.end();
        }
    };

};