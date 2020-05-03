const Users = require('./users.scheme')
const passwordHash = require('password-hash');
const createError = require('http-errors')
const { validationResult } = require('express-validator');
 
exports.login = (username, password)=>{
 return new Promise((resolve, reject)=>{
     Users.findOne({ username })
     .select('_id password username role')
     .populate('role')
     .then((foundUser)=>{
         if(!foundUser) return reject(createError(400, 'Username not found!'))
         const hashedPassword = foundUser.password
         const isValidPassword = passwordHash.verify(password, hashedPassword)
         if (isValidPassword) {
           resolve(foundUser)
         } else {
           reject(createError(400, 'Wrong Password!'))
         }
     })
 })
}
 
exports.findAll = (req, res, next) => {
 const q = req.query;
 const where  = {}
 if(q.email) where['email'] = q.name;
 if(q.username) where['username'] = q.username;
 if(q.displayName) where['displayName'] = q.displayName;
 
 Users.find(where)
 .limit(req.query.limit || 0)
 .skip(req.query.skip || 0)
 .populate('role')
 .then(users => {
    res.json(users);
 })
 .catch(err => next(err));
}
 
exports.findById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }  
 const id = req.params.id
 Users.findById(id)
 .populate('role')
 .then(users => {
    res.json(users);
 })
 .catch(err => next(err));
}
 
exports.insert = (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
 }

 let data = req.body;
 data.password = passwordHash.generate(data.password);
 Users.create(data)
 .then(users => {
    res.json({
      message: `New user added!`,
      data: users
    });
 })
 .catch(err => next(err))
}
 
exports.updateById = (req, res, next) => {
 const id = req.params.id
 const data = req.body
 if(req.body.password) data.password = passwordHash.generate(req.body.password);
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
 }
 
 Users.findByIdAndUpdate(id, data)
 .then(users => {
    res.json({
      message: `User ${id} updated!`,
      data: users
    });
 })
 .catch(err => next(err))
}
 
exports.remove = (req, res, next) => {
 Users.remove()
 .then(users => {
    res.json({
      message: 'All users removed!',
      data: users
    });
 })
 .catch(err => next(err))
}
 
exports.removeById = (req, res, next) => {
 const id = req.params.id
 Users.findByIdAndRemove(id)
 .then(users => {
    res.json({
      message: `User ${id} removed!`,
      data: users
    });
 })
 .catch(err => next(err))
}

exports.findByUserOrEmail = (value) => {
  return Users.findOne({$or: [{ username: value}, { email: value}]})
 } 