module.exports = {
    loginUser: function(User, credentials, bcrypt, res) {
        User.findOne({ username_lower: credentials.username }, function (findUserError, user) {
            if (findUserError) {
                console.log(findUserError);
            } else if (user != null) {
                bcrypt.compare(credentials.password, user.password, function (comparePasswordError, isMatching) {
                    if (comparePasswordError) {
                        console.log(comparePasswordError);
                    } else {
                        if (isMatching) {
                            res.send({
                                loggedIn: true,
                                userId: user._id,
                                username: user.username
                            });
                        } else {
                            res.send({
                                loggedIn: false,
                            });
                            return;
                        }
                    }
                });
            }
        });
    },

    createNewAccount: function(User, credentials, bcrypt, res) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (genSaltError, salt) {
            if (genSaltError) {
                return console.log(genSaltError);
            }
            bcrypt.hash(credentials.password, salt, function (hashingError, hash) {

                if (err) {
                    console.log(hashingError);
                    return;
                }
                credentials.password = hash;


                User.count({}, function (userCountError, count) {
                    if (userCountError) {
                        console.log(userCountError);
                    } else {
                        var pingPongUser = new User({
                            username: credentials.username,
                            username_lower: credentials.username.toLowerCase(),
                            password: credentials.password,
                            placing: count + 1
                        });

                        pingPongUser.save(function(saveUserError) {
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
        });
    }
}