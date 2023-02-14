const { Branch } = require('../models');
const asyncHandler = require('express-async-handler');
const { checkMongooseId } = require('../utils/checkId')

exports.getAll = asyncHandler(async (req, res) => {
   const branches = await Branch
      .find()
      .sort({ createdAt: -1 })

   if (!branches) {
      res.status(400)
      throw new Error("Sohalar mavjud emas");
   }

   res.status(200).json({ branches });
})

exports.getOne = asyncHandler(async (req, res) => {
   const branchId = req.params.branchId;

   const checkedId = checkMongooseId(branchId);

   if (!checkedId) {
      res.status(400);
      throw new Error("ID mavjud emas");
   }

   const branch = await Branch.findById(branchId)
      .populate('internalBranches')

   if (!branch) {
      res.status(400);
      throw new Error('Soha mavjud emas');
   }

   res.status(200).json({ branch });
})

exports.create = asyncHandler(async (req, res) => {
   const { name } = req.body

   if (!name) {
      res.status(400)
      throw new Error("Barcha maydonlar to'ldirilishi shart");
   }

   const branchExist = await Branch.findOne({ name });

   if (branchExist) {
      res.status(400);
      throw new Error("Bunday soha bazada mavjud");
   }

   const newBranch = await Branch.create({ name });

   res.status(201).json({ message: "Muvaffaqqiyatli yaratildi", branch: newBranch });
})