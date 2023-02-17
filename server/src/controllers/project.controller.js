const { InternalBranch, Project, District } = require('../models');
const asyncHandler = require('express-async-handler');
const { checkMongooseId } = require('../utils/checkId');
const path = require('path')

exports.getAll = asyncHandler(async (req, res) => {
   const projects = await Project
      .find()
      .populate('district')
      .populate('branch')
      .populate('internalBranch')
      .sort({ createdAt: -1 })


   if (!projects) {
      res.status(400)
      throw new Error("Loyihalar mavjud emas");
   }

   res.status(200).json({ projects });
})

exports.getOne = asyncHandler(async (req, res) => {
   const projectId = req.params.projectId;

   const checkedId = checkMongooseId(projectId);

   if (!checkedId) {
      res.status(400);
      throw new Error("ID mavjud emas");
   }

   const project = await Project
      .findById(projectId)
      .populate('district')
      .populate('branch')
      .populate('internalBranch')

   if (!project) {
      res.status(400);
      throw new Error('Loyiha mavjud emas');
   }

   res.status(200).json({ project });
})

exports.create = async (req, res) => {
   try {
      if(!req.files) {
         return res.status(400).json({ message: 'Fayl yuklanmagan' })
      }

      const file = req.files.file

      if(!file.mimetype.startsWith('application/pdf')) {
         return res.status(400).json({ message: 'Faqat pdf file yuklang' })
      }

      if(file.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({ message: 'Fayl hajmi juda katta' })
      }

      const { name, internalBranch, district, branch } = req.body

      file.name = `projec_${Date.now()}${path.parse(file.name).ext}`

      file.mv(`public/projectFile/${file.name}`, async (err) => {
         if (err) {
            return res.status(500).json({ message: 'Fayl yuklanmadi' })
         }
      })

      const project = await Project.create({
         name,
         internalBranch,
         file: `/projectFile/${file.name}`,
         district,
         branch
      })

      await InternalBranch.findByIdAndUpdate(internalBranch, {
         $push: {
            projects: project._id
         }
      }, { new: true })

      await District.findByIdAndUpdate(district, {
         $push: {
            projects: project._id
         }
      })

      res.status(201).json({ project, message: 'Muvaffaqqiyatli yuklandi' })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.filterBranchAndInternalBranch = asyncHandler(async (req, res) => {
   const { branchId, internalBranchId } = req.params;

   const filterData = await Project.find({
      branch: branchId,
      internalBranch: internalBranchId
   }).populate('district')
   .populate('internalBranch')
   .populate('branch')

   if (!filterData) {
      res.status(400)
      throw new Error("Hech qanday ma'lumot mavjud emas");
   }

   res.status(200).json({ projects: filterData });
})

exports.filterBranchInternalBranchAndDistrict = asyncHandler(async (req, res) => {
   const { branchId, internalBranchId, districtId } = req.params;

   const filterData = await Project.find({
      branch: branchId,
      internalBranch: internalBranchId,
      district: districtId
   }).populate('district')
   .populate('internalBranch')
   .populate('branch')

   if (!filterData) {
      res.status(400)
      throw new Error("Hech qanday ma'lumot mavjud emas");
   }

   res.status(200).json({ projects: filterData });
})

exports.delete = asyncHandler(async (req, res) => {
   const projectId = req.params.projectId;

   if (!checkMongooseId(projectId)) {
      res.status(400)
      throw new Error("ID mavjud emas");
   }

   const project = await Project.findById(projectId);

   await District.findByIdAndUpdate(project.district, {
      $pull: {
         projects: projectId
      }
   }, {
      new: true
   })

   await InternalBranch.findByIdAndUpdate(project.internalBranch, {
      $pull: {
         projects: projectId
      }
   })

   await Project.findByIdAndRemove(projectId);

   res.status(200).json({ message: "Muvaffaqqiyatli o'chirildi" })
})

exports.updateName = asyncHandler(async(req, res) => {
   const projectId = req.params.projectId;

   if (!checkMongooseId(projectId)) {
      res.status(4000)
      throw new Error("ID mavjud emas");
   }

   const { name } = req.body

   await Project.findByIdAndUpdate(projectId, { name: name }, { new: true });

   res.status(200).json({ message: "Muvaffaqqiyatli o'zgartirildi" })
})