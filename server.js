var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var astroid = require('./public/js/astroid');
var app = express();


var currentPort = 8080;
console.log('Welcome... Port: ' + currentPort + ' will be ready shortly!')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile('./public/html/index.html', {
        root: './'
    });
});

app.post('/search', function (req, res) {
    request({
            url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.body.startDate}&end_date=${req.body.endDate}&api_key=jkFSPoYMf5xZc4YSiG24QzOEJBLThffnE7R43vbd`,
            headers: {
                'User-Agent': 'request'
            }
        },
        function (error, response, body) {
            var nearMissAstroids = [];
            if (error || res.statusCode !== 200) {
                console.log('Something went wrong');
                res.send('Sorry but there was a problem!');
            } else {
                var data = JSON.parse(body);

                for (var day in data.near_earth_objects) {
                    nearMissAstroids = astroid.processInfo(data.near_earth_objects[day], day);
                }
                res.send(astroid.displayNearMissData(nearMissAstroids));
            }
        })
})

app.use(function (req, res) {
    res.sendStatus(404);
});

var server = app.listen(currentPort, function () {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
    console.log('Thanks ... the app is ready for action.')
});
