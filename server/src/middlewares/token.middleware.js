const jsonwebtoken = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { User } = require('../models')

const tokenDecode = (req) => {
   const bearerHeader = req.headers['authorization'];
   if(bearerHeader) {
      const bearer = bearerHeader.split(' ')[1];
      try {
         const tokenDecoded = jsonwebtoken.verify(
            bearer, 
         process.env.TOKEN_SECRET_KEY);
         return tokenDecoded;
      } catch (err) {
         return false;
      }
   } else {
      return false;
   }
}

exports.verifyAdminToken = asyncHandler (async (req, res, next) => {
   const tokenDecoded = tokenDecode(req);
   if(tokenDecoded) {
      const admin = await User.findById(tokenDecoded.id);
      if(!admin) return res.status(401).json({ message: 'No allowed' });
      req.admin = admin;
      next();
   } else {
      return res.status(401).json({ message: 'Unauthorized' });
   }
})