module.exports = {
    getAllPlayers: function(User, res) {
        User.find({}, null, { sort: { 'placing': 1 } }, function (err, users) {
            if (err) {
                console.log(err);
            } else {
                var userMap = [];
                users.forEach(function (user) {
                    var returnedUser = {
                        _id: user._id,
                        username: user.username,
						placing: user.placing,
						old_placing: user.old_placing,
                        points: user.points
                }
                    userMap.push(returnedUser);
                });

                res.send(userMap);
            }
        });
    }
}