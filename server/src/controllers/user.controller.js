const { User } = require('../models');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.register = asyncHandler (async (req, res) => {
   const {
      displayName,
      username,
      password
   } = req.body

   if (!displayName || !username || !password) {
      res.status(400)
      throw new Error("Barcha maydonlar to'ldirilishi shart!");
   }

   if (password.length < 6) {
      res.status(400);
      throw new Error("Parol kamida 6ta belgidan iborat bo'lishi kerak!");
   }

   const userExist = await User.findOne({ username });

   if (userExist) {
      res.status(400);
      throw new Error("Bunday foydalanuvchi oldin ro'yxatdan o'tgan!")
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = await User.create({
      displayName,
      username,
      password: hashedPassword
   })

   if (user) {
      const { _id, username, displayName, createdAt, updatedAt } = user;
      res.status(201).json({ 
         _id,
         username,
         displayName,
         createdAt,
         updatedAt
      })
   } else {
      res.status(400);
      throw new Error("Noto'gri ma'lumotlar kiritilgan")
   }
})

exports.login = asyncHandler(async (req, res) => {
   const {
      username,
      password
   } = req.body

   if(!username || !password) {
      res.status(400);
      throw new Error("Barcha maydonlar to'ldirilishi shart!");
   }

   if (password.length < 6) {
      res.status(400);
      throw new Error("Parol kamida 6ta belgidan iborat bo'lishi kerak!");
   }

   const userExist = await User.findOne({ username });

   if (!userExist) {
      res.status(400);
      throw new Error("Username yoki parol xato");
   }

   const comparePass = await bcrypt.compare(password, userExist.password);

   if (!comparePass) {
      res.status(400);
      throw new Error("Username yoki parol xato");
   }

   const token = jsonwebtoken.sign({
      id: userExist._id,
   }, process.env.TOKEN_SECRET_KEY);

   userExist.password = undefined;

   res.status(200).json({token, admin: userExist});
})