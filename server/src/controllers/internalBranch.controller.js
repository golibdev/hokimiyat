const { InternalBranch } = require('../models');
const asyncHandler = require('express-async-handler');
const { checkMongooseId } = require('../utils/checkId')

exports.getAll = asyncHandler(async (req, res) => {
   const internalBranches = await InternalBranch
      .find()
      .populate('projects')
      .sort({ createdAt: -1 })

   if (!internalBranches) {
      res.status(400)
      throw new Error("Ichki sohalar mavjud emas");
   }

   res.status(200).json({ internalBranches });
})

exports.getOne = asyncHandler(async (req, res) => {
   const id = req.params.id;

   const checkedId = checkMongooseId(id);

   if (!checkedId) {
      res.status(400);
      throw new Error("ID mavjud emas");
   }

   const internalBranch = await InternalBranch.findById(id)
      .populate('projects')

   if (!internalBranch) {
      res.status(400);
      throw new Error('Ichki soha mavjud emas');
   }

   res.status(200).json({ internalBranch });
})

exports.create = asyncHandler(async (req, res) => {
   const { name } = req.body

   if (!name) {
      res.status(400)
      throw new Error("Barcha maydonlar to'ldirilishi shart");
   }

   const internalBranchExist = await InternalBranch.findOne({ name });

   if (internalBranchExist) {
      res.status(400);
      throw new Error("Bunday ichki soha bazada mavjud");
   }

   const newInternalBranch = await InternalBranch.create({ name });

   res.status(201).json({ message: "Muvaffaqqiyatli yaratildi", internalBranchExist: newInternalBranch });
})