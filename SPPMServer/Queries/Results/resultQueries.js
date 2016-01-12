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
										    movingUser.old_placing = movingUser.placing;
										    movingUser.placing = movingUser.placing + 1;
										} else if (movingUser.username === winningUser.username) {
											movingUser.old_placing = movingUser.placing;
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
		    users.forEach(function(user) {
				if (user.username === firstPlace.username) {
				    user.points = user.points + 2;
				} else if (user.username === secondPlace.username) {
				    user.points = user.points + 1;
				}
			});

		    moveUserIfNecessary(users, promise);
		});
	},

	registerDoubleMatchResult: function(User, result, promise) {
	    User.find({}, null, { sort: { 'placing': 1 } }, function(err, users) {
	        users.forEach(function(user) {
				if (user.username == result.winner.playerOne.username || user.username == result.winner.playerTwo.username) {
				    user.points += result.winner.points;
				} else if (user.username == result.loser.playerOne.username || user.username == result.loser.playerTwo.username) {
				    user.points += result.loser.points;
				}
			});

			moveUserIfNecessary(users, promise);
	    });
	}
}

var moveUserIfNecessary = function (users, promise) {
	var userWasMoved = false;
	users.forEach(function (user, index, userArray) {
		if (user.points >= 5 && user.placing !== 1) {
		    user.old_placing = user.placing;
			user.placing = user.placing - 1;
			user.points = user.points - 5;
			users[index - 1].old_placing = users[index - 1].placing;
			users[index - 1].placing = users[index - 1].placing + 1;
			userWasMoved = true;
		}
		
		users = users.sort(function (a, b) { return a.placing - b.placing });
		
		if (index === userArray.length - 1) {
			if (userWasMoved) {
				moveUserIfNecessary(users, promise);
			} else {
			    saveUsers(users, promise);
			}
		}
	});
}

var saveUsers = function(users, promise) {
	users.forEach(function (user, index, userArray) {
		user.save(function (err) {
			if (err) {
				console.log(err);
			} else if (userArray[index + 1] == null) {
			    promise(true);
			}
		});
	});
}