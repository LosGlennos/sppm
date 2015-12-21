//Refactor!!
 
module.exports = {
    registerSingleMatchResult: function(User, result, res) {
        User.findOne({ username_lower: result.winner }, function (findWinnerError, winningUser) {
            
        });
    },

    registerKnockoutPlacings: function (User, result, res) {
        var firstPlace = result.placing1;
		var secondPlace = result.placing2;

		User.find({}, null, { sort: { 'placing': 1 } }, function (err, users) {
		    var count = 1;
            users.forEach(function(user) {
				if (user._id === firstPlace.id) {
					user.points = user.points + 2;
				} else if (user._id === secondPlace.id) {
				    user.points = user.points + 1;
				}

				if (user.placing !== 1 && user.placing >= 5) {
					users[user.placing - 2].placing = users[user.placing - 2].placing + 1;
					user.placing = user.placing - 1;
				    user.points = user.points - 5;
				}

				count++;
            });
		});
    }
}