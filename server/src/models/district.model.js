const { model, Schema } = require('mongoose');

const districtSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   file: {
      type: String,
      required: true
   },
   passportFile: {
      type: String,
      required: true
   },
   projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
   }]
}, {
   timestamps: true
})

module.exports = model('District', districtSchema);