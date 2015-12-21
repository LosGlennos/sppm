﻿//Refactor!!
 
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
            users.forEach(function (user, idx, userArray) {
                var tempUser;
				if (user.username === firstPlace.username) {
					user.points = user.points + 2;
				} else if (user.username === secondPlace.username) {
				    user.points = user.points + 1;
				}

                if (user.placing !== 1 && user.points >= 5) {
                    users.forEach(function (userToBeMoved) {
                        if (userToBeMoved.placing === user.placing - 1) {
                            userToBeMoved.placing = userToBeMoved.placing + 1;
                        }
                    });
					user.placing = user.placing - 1;
                    user.points = user.points - 5;
                }
                
                count++;

                if (idx === userArray.length - 1) {
                    users.forEach(function (userToSave, index, userToSaveArray) {
                        userToSave.save(function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });

                        if (index === userToSaveArray.length - 1) {
                            users.forEach(function (userGtFivePoints) {
                                if (userGtFivePoints.points >= 5 && userGtFivePoints.placing != 1) {
                                    User.findOne({ placing: userGtFivePoints.placing - 1 }, function (err, firstUserToBeMoved) {
                                        firstUserToBeMoved.placing = firstUserToBeMoved.placing + 1;
                                        firstUserToBeMoved.save(function (firstUserToBeSavedError) {
                                            if (firstUserToBeSavedError) {
                                                console.log(firstUserToBeSavedError);
                                            } else if (userGtFivePoints.points >= 10 && userGtFivePoints.placing > 2) {
                                                User.findOne({ placing: userGtFivePoints.placing - 2 }, function (err, secondUserToBeMoved) {
                                                    secondUserToBeMoved.placing = secondUserToBeMoved.placing + 1;
                                                    secondUserToBeMoved.save(function (secondUserToBeMovedError) {
                                                        if (secondUserToBeMovedError) {
                                                            console.log(secondUserToBeMovedError);
                                                        } else {
                                                            userGtFivePoints.points = userGtFivePoints.points - 10;
                                                            userGtFivePoints.placing = userGtFivePoints.placing - 2;
                                                            userGtFivePoints.save(function (userGtFivePointsError) {
                                                                if (userGtFivePointsError) {
                                                                    console.log(userGtFivePointsError);
                                                                }
                                                            });
                                                        }
                                                    });
                                                });
                                            } else {
                                                userGtFivePoints.points = userGtFivePoints.points - 5;
                                                userGtFivePoints.placing = userGtFivePoints.placing - 1;
                                                userGtFivePoints.save(function (userGtFivePointsError) {
                                                    if (userGtFivePointsError) { 
                                                        console.log(userGtFivePointsError);
                                                    }   
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            });
		});
    }
}