const passport = require('passport')
 
exports.auth = passport.authenticate('jwt', {session: false})
exports.JWT_SECRET = 'Psstt!!Jang4nBilangSi4pa2!'