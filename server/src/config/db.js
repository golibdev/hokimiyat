const mongoose = require('mongoose');
const { MONGO_URI } = require('./index');

exports.connectedDB = () => {
   mongoose.set('strictQuery', false);
   mongoose.connect(MONGO_URI).then(() => {
      console.log("Connected successfuly")
   }).catch((err) => {
      console.log(err)
   })
}