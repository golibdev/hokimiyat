const { isValidObjectId } = require('mongoose');

exports.checkMongooseId = (id) => {
   if(!isValidObjectId(id)) {
      return false;
   }

   return true
}