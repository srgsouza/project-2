var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy(
    function (username, password, done) {        
        User.findOne({ username: username }, function (err, user) {            
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // validPassword must be defined by develper (not provided by Passport)
            // For our case, it will be a mongoose method defined in the users model
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
                console.log('Incorrect password');
                
            }            
            return done(null, user);
        });
    }
));
 
