var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var dbSchemas = require('./database-schemas.js');
var config = require('./config.js')
var getPlayersQueries = require('./Queries/GetPlayers/getPlayersQueries.js');
var accountQueries = require('./Queries/Account/accountQueries.js');
var resultQueries = require('./Queries/Results/resultQueries.js');
var fridayFinalDb = require('./Queries/FridayFinals/fridayFinalDb.js');

var app = express();

mongoose.connect(config.databaseURI);
var db = mongoose.connection;
var Schema = mongoose.Schema;

var User;
var Finals;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	next();
});

app.get('/getAllPlayers', function (req, res) {
	getPlayersQueries.getAllPlayers(User, res);
});

app.get('/fridayFinalsMatches', function(req, res) {
    fridayFinalDb.getMatches(Finals, function(matches) {
		res.send({ matches: matches });
    });
});

app.post('/registerSingleMatchResult', function (req, res) {
	var result = { winner: req.body.winner.toLowerCase(), loser: req.body.loser.toLowerCase() };
	
	resultQueries.registerSingleMatchResult(User, result, function (success) {
		res.send({
			success: success
		});
	});
});

app.post('/registerDoubleMatchResult', function(req, res) {
	var result = { winner: req.body.winner, loser: req.body.loser }

    resultQueries.registerDoubleMatchResult(User, result, function(success) {
        res.send({
            success: success
        });
    });
});

app.post('/postQualifications', function(req, res) {
	var result = req.body;
	var qualified = result.qualified;
	var qualification = result.qualification;

    fridayFinalDb.seedMatches(Finals, qualification, qualified, function(success) {
        res.send({
			success: success
        });
    });
});

app.post('/postKnockoutPlacings', function (req, res) {
	var result = req.body;
	
	var updateSuccessful = resultQueries.registerKnockoutPlacings(User, result, function (success) {
		res.send({
			success: success
		});
	});
});

app.post('/resetStandings', function (req, res) {
	User.find({}, function (err, users) {
		users.forEach(function (user) {
			user.points = 0;
			user.save(function (err) {
				if (err) {
					console.log(err);
				}
			});
		});
	});
});

app.post('/addNewPlayer', function (req, res) {
	var credentials = req.body;
	
	console.log(credentials);
	
	User.count({}, function (userCountError, count) {
		if (userCountError) {
			console.log(userCountError);
		} else {
			var pingPongUser = new User({
				username: credentials.username,
				username_lower: credentials.username.toLowerCase(),
				points: 0,
				placing: count + 1,
				old_placing: count + 1
			});
			
			pingPongUser.save(function (saveUserError) {
				if (saveUserError) {
					res.send({
						success: false,
						details: saveUserError.code
					});
					return console.error(saveUserError);
				} else {
					res.send({
						success: true
					});
				}
			});
		}
	});
});

var server = app.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server listening on http://' + host + ':' + port);
});

db.on('error', console.error);
db.once('open', function callback() {
	dbSchemas.createDatabaseSchemas(Schema);
	User = mongoose.model('User', dbSchemas.userSchema);
    Finals = mongoose.model('Finals', dbSchemas.fridayFinalsSchema);
});