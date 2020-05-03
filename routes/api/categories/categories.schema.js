const { Schema, model } = require('../../../db.config')
const scheme = new Schema({
  name:{
     type: String,
     required: true,
     unique: true
  },
});
module.exports = model('Categories', scheme, 'Categories');