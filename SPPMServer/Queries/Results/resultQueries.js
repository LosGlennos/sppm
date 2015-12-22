//Refactor!!
 
module.exports = {
	registerSingleMatchResult: function (User, result, promise) {
		var winningUser;
	    var losingUser;
		User.find({}, function (findUsersError, users) {
		    if (findUsersError) {
				promise(false);
		    } else {
		        users.forEach(function(user, index, userArray) {
					if (user.username_lower === result.winner) {
						winningUser = user;
					} else if (user.username_lower === result.loser) {
						losingUser = user;
					}

					if (index === userArray.length - 1) {
					    if (winningUser.placing > losingUser.placing) {
					        User.find({}, null, { sort: { 'placing': 1 } }, function(movingUsersError, movingUsers) {
								if (movingUsersError) {
									promise(false);
								} else {
								    movingUsers.forEach(function(movingUser, movingIndex, movingUsersArray) {
										if (movingUser.placing < winningUser.placing && movingUser.placing >= losingUser.placing) {
										    movingUser.placing = movingUser.placing + 1;
										} else if (movingUser.username === winningUser.username) {
										    movingUser.placing = losingUser.placing;
										}

										if (movingIndex === movingUsersArray.length - 1) {
											movingUsers.forEach(function(savingUser, savingIndex, savingArray) {
										        savingUser.save(function(saveErr) {
										            if (saveErr) {
										                promise(false);
													} else if (savingIndex === savingArray.length - 1) {
										                console.log(movingUsers);
										                promise(true);
										            }
										        });
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
    },

    registerKnockoutPlacings: function (User, result, promise) {
        var firstPlace = result.placing1;
		var secondPlace = result.placing2;

		User.find({}, null, { sort: { 'placing': 1 } }, function (err, users) {
            var count = 1;
            users.forEach(function (user, idx, userArray) {
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
                                promise(false);
                            }
                        });

                        if (index === userToSaveArray.length - 1) {
                            users.forEach(function (userGtFivePoints, theIndex, arrayOfDoom) {
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
                                                                    promise(false);
                                                                } else {
                                                                    promise(true);
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
                                                        promise(false);
                                                    } else { 
                                                        promise(true);
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                                if (theIndex === arrayOfDoom.length - 1) {
                                    promise(true);
                                }
                            });
                        }
                    });
                }
            });
		});
    }
}