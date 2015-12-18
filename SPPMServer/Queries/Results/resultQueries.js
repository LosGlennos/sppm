//Refactor!!
 
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
                                runnerUpUser.points = runnerUpUser.points + 1;
                                runnerUpUser.save(function(runnerUpErr) {
                                    if (runnerUpErr) {
                                        console.log(runnerUpErr);
                                    } else {
                                        User.find({}, null, { sort: { 'placing': 1 } }, function (err, users) {
											if (err) {
											    console.log(err);
											} else {
											    var count = 0;
												users.forEach(function (user) {
												    count++;
											        if (user.points >= 5 && user.placing !== 1) {
											            User.findOne({ placing: user.placing - 1 }, function(err, userToBeMoved) {
											                if (err) {
											                    console.log(err);
											                } else {
											                    userToBeMoved.placing = userToBeMoved.placing + 1;
											                    userToBeMoved.save(function(err) {
											                        if (err) {
											                            console.log(err);
											                        } else {
											                            user.placing = user.placing - 1;
											                            user.points = user.points - 5;
											                            user.save(function(err) {
											                                if (err) {
											                                    console.log(err);
											                                } else if (count === users.length) {
											                                    User.findOne({ points: { $gt: 4 } }, function(error, theUser) {
											                                        if (error) {
											                                            console.log(error);
											                                        } else if (theUser !== null && theUser.placing !== 1) {
											                                            var userPoints = theUser.points;
											                                            var numberOfMoves = Math.floor(userPoints / 5);
											                                            for (var i = 0; i < numberOfMoves; i++) {
											                                                User.findOne({ placing: theUser.placing - 1 }, function(err, theUserToBeMoved) {
											                                                    if (err) {
											                                                        console.log(err);
											                                                    } else {
											                                                        theUserToBeMoved.placing = theUserToBeMoved.placing + 1;
											                                                        theUserToBeMoved.save(function(err) {
											                                                            if (err) {
											                                                                console.log(err);
											                                                            } else {
											                                                                theUser.placing = theUser.placing - 1;
											                                                                theUser.points = theUser.points - 5;
											                                                                theUser.save(function(err) {
											                                                                    if (err) {
											                                                                        console.log(err);
											                                                                    }
											                                                                });
											                                                            }
											                                                        });
											                                                    }
											                                                });
											                                            }
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
                        });
                    }
                });
            }
        });
    }
}