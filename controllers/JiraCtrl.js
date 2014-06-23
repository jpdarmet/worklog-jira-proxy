/**
 *   JiraCtrl
 */

var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;

var config = require('../config');

module.exports = function JiraCtrl(app) {

    return {
        findFromQuery: function (req, res) {
            var params = {
                jql: req.query.jql,
                startAt: 0,
                maxResults: 5000,
                fields: "fixVersions,worklog"
            };
            var options = {
                hostname: config.jira.host,
                port: 443,
                path: config.jira.path + "?" + qs.stringify(params),
                method: 'GET',
                headers: {
                    "Authorization": req.headers["authorization"],
                    "Content-Type": "application/json;charset=UTF-8"
                },
                cert: fs.readFileSync("./certificat/issuetracker.sicap.com.cer"),
                agent: false
            };

            var requestHTTPS = https.request(options, function (responseHTTPS) {
                if (responseHTTPS.statusCode != 200) {
                    res.status(responseHTTPS.statusCode);
                    res.send(responseHTTPS.statusCode);
                    return;
                }

                var chunks = [];
                responseHTTPS.on('data', function (chunk) {
                    chunks.push(chunk);
                });

                responseHTTPS.on('end', function () {
                    var file = new Buffer.concat(chunks);
                    res.send(file);
                });

            });
            requestHTTPS.on('error', function (err) {
                console.error(err);
                res.status(500);
                res.send(err);
            });
            requestHTTPS.end();
        }
    };

};