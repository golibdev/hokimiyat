const { model, Schema } = require('mongoose');

const userModel = new Schema({
   displayName: {
      type: String,
      required: true
   },
   username: {
      type: String, 
      required:  true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      minLength: 6
   }
}, {
   timestamps: true
})

module.exports = model('User', userModel);