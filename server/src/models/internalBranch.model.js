const { model, Schema } = require('mongoose');

const internalBranchSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
   }]
}, {
   timestamps: true
})

module.exports = model('InternalBranch', internalBranchSchema);