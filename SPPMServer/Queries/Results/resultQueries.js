module.exports = {
    registerSingleMatchResult: function(User, result, res) {
        User.findOne({ username_lower: result.winner }, function (findWinnerError, winningUser) {
            
        });
    },

    registerKnockoutPlacings: function (User, result, res) {
        var firstPlace = result.placing1;
        var secondPlace = result.placing2;

        User.findOne({ _id: firstPlace.id }, function (findWinnerError, winningUser) {
            if (findWinnerError) {
                console.log(findWinnerError);
            } else {
                winningUser.points = winningUser.points + 2;

                winningUser.save(function(winningUserErr) {
                    if (winningUserErr) {
                        console.log(winningUserErr);
                    } else {
                        User.findOne({ _id: secondPlace.id }, function(findRunnerUpError, runnerUpUser) {
                            if (findRunnerUpError) {
                                console.log(findRunnerUpError);
                            } else {
                                runnerUpUser.points = runnerUpUser + 1;
                                runnerUpUser.save(function(runnerUpErr) {
                                    if (runnerUpErr) {
                                        console.log(runnerUpErr);
                                    } else {
                                        User.find({}, null, { sort: { 'placing': 1 } }, function (err, users) {
                                            if (err) {
                                                users.forEach(function(user) {
                                                    if (user.points >= 5 && user.placing !== 1) {
                                                        User.find({ placing: user.placing - 1 }, function(err, userToBeMoved) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}