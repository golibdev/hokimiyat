const { model, Schema } = require('mongoose');

const branchSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
}, {
   timestamps: true
})

module.exports = model('Branch', branchSchema);