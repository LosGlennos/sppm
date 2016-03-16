module.exports = {
	seedMatches: function (Finals, qualification, qualified, promise) {
		var numberOfPlayers = qualification.length + qualified.length;
		var numberOfRounds = Math.floor(Math.sqrt(numberOfPlayers));
		var numberOfCompleteRounds = Math.pow(2, numberOfRounds);
	    var matches = [];
		for (var i = 0; i < qualification.length / 2; i++) {
		    var qualificationRound = new Finals({
		        player_one: qualification[i].username,
		        player_one_seed: qualified.length + 1 + i,
		        player_two: qualification[i + 1].username,
		        player_two_seed: i + 2 + qualified.length,
		        type: 2
			});
			matches.push(qualificationRound);
		}

	    for (var i = 0; i < numberOfCompleteRounds / 2; i++) {
	        var qualifiedRound = new Finals({
	            player_one: qualified[i] == null ? '' : qualified[i].username,
				player_one_seed: i + 1,
				player_two: qualified[numberOfCompleteRounds - 1 - i] == null ? '' : qualified[numberOfCompleteRounds - 1 - i].username,
				player_two_seed: numberOfCompleteRounds - i,
				round: numberOfCompleteRounds,
				type: 1
			});
	        matches.push(qualifiedRound);
		}

		matches.forEach(function(match, index, matchesArray) {
		    match.save(function(error) {
		        if (error) {
		            console.log(error);
				} else if (index === matchesArray.length - 1) {
		            promise(true);
		        }
		    });
		});
	},

	getMatches: function(Finals, promise) {
	    Finals.find({}, function(err, matches) {
	        if (err) {
	            console.log(err);
			} else {
	            var matchesMap = [];
	            matches.forEach(function(match) {
	                matchesMap.push(match);
	            });
	            promise(matchesMap);
	        }
	    });
	}
};