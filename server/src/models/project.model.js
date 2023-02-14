const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   file: {
      type: String,
      required: true,
   },
   internalBranch: {
      type: Schema.Types.ObjectId,
      ref: 'InternalBranch',
      required: true
   },
   district: {
      type: Schema.Types.ObjectId,
      ref: 'District',
      required: true
   },
   branch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Branch'
   }
}, {
   timestamps: true
})

module.exports = model('Project', projectSchema);