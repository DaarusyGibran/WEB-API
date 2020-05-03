const { Schema, model } = require('../../../db.config')
const scheme = new Schema({
  title:{
     type: String,
     required: true,
  },
  permalink:{
     type: String,
     required: false,
     default:null
  },
  description: {
     type: String,
     required: true
  },
  isDraft: {
     type: Boolean,
     required: true,
  },
  isPublished: {
     type: Boolean,
     required: true
  },
  category: [{
     type: Schema.Types.ObjectId,
     ref: 'Categories', select:true
  }],
  tags: [{
     type: Schema.Types.ObjectId,
     ref: 'Tags', select:true
  }],
  createdBy: {
     type: Schema.Types.ObjectId,
     ref: 'Users', select:true
  },
  updatedBy: {
     type: Schema.Types.ObjectId,
     ref: 'Users', select:true
  },
}, {
  timestamps: true
});
module.exports = model('Posts', scheme, 'posts');