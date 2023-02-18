const { District } = require('../models');
const asyncHandler = require('express-async-handler');
const { checkMongooseId } = require('../utils/checkId');
const path = require('path')

exports.getAll = asyncHandler(async (req, res) => {
   const districts = await District
      .find()
      .populate('projects')
      .sort({ createdAt: -1 })

   if (!districts) {
      res.status(400)
      throw new Error("Tumanlar mavjud emas");
   }

   res.status(200).json({ districts });
})

exports.getOne = asyncHandler(async (req, res) => {
   const districtId = req.params.districtId;

   const checkedId = checkMongooseId(districtId);

   if (!checkedId) {
      res.status(400);
      throw new Error("ID mavjud emas");
   }

   const district = await District.findById(districtId)
      .populate('projects')

   if (!district) {
      res.status(400);
      throw new Error('Tuman mavjud emas');
   }

   res.status(200).json({ district });
})

exports.create = asyncHandler(async (req, res) => {
   if(!req.files) {
      return res.status(400).json({ message: 'Fayl yuklanmagan' })
   }

   const file = req.files.file
   const passportFile = req.files.passportFile;

   if(!file.mimetype.startsWith('image') || !passportFile.mimetype.startsWith('image')) {
      return res.status(400).json({ message: 'Faqat rasm yuklang' })
   }

   if(file.size > process.env.MAX_FILE_SIZE || passportFile.size > process.env.MAX_FILE_SIZE) {
      return res.status(400).json({ message: 'Fayl hajmi juda katta' })
   }
   
   const { name } = req.body;

   file.name = `district_${Date.now()}${path.parse(file.name).ext}`

   file.mv(`public/districtFile/${file.name}`, async (err) => {
      if (err) {
         return res.status(500).json({ message: 'Fayl yuklanmadi' })
      }
   })

   passportFile.mv(`public/passportFile/${passportFile.name}`, async (err) => {
      if (err) {
         return res.status(500).json({ message: 'Fayl yuklanmadi' })
      }
   })

   if (name === '') {
      res.status(400)
      throw new Error("Barcha maydonlar to'ldirilishi shart");
   }

   const districtExist = await District.findOne({ name });

   if (districtExist) {
      res.status(400);
      throw new Error("Bunday tuman bazada mavjud");
   }

   const newDistrict = await District.create({ 
      name, 
      file: `/districtFile/${file.name}`,
      passportFile: `/passportFile/${passportFile.name}`
   });

   res.status(201).json({ 
      message: "Muvaffaqqiyatli yaratildi", 
      district: newDistrict 
   });
})

exports.update = asyncHandler(async (req, res) => {
   const districtId = req.params.districtId;

   if(!checkMongooseId(districtId)) {
      res.status(400);
      throw new Error("ID mavjud emas");
   }

   const district = await District.findById(districtId);

   if (!district) {
      res.status(400);
      throw new Error("Tuman mavjud emas");
   }

   if (req?.files?.file) {
      const file = req.files.file

      if(!file.mimetype.startsWith('image')) {
         return res.status(400).json({ message: 'Faqat rasm yuklang' })
      }
   
      if(file.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({ message: 'Fayl hajmi juda katta' })
      }
      
      file.name = `district_${Date.now()}${path.parse(file.name).ext}`;

      file.mv(`public/districtFile/${file.name}`, async (err) => {
         if (err) {
            return res.status(500).json({ message: 'Fayl yuklanmadi' })
         }
      })

      await District.findByIdAndUpdate(districtId, {
         file: `/uploads/${file.name}`
      }, { new: true });
   }

   if (req?.files?.passportFile) {
      const passportFile = req.files.passportFile;
      if(!passportFile.mimetype.startsWith('image')) {
         return res.status(400).json({ message: 'Faqat rasm yuklang' })
      }
   
      if(passportFile.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({ message: 'Fayl hajmi juda katta' })
      }
      
      passportFile.name = `passportFile_${Date.now()}${path.parse(passportFile.name).ext}`;

      passportFile.mv(`public/passportFile/${passportFile.name}`, async (err) => {
         if (err) {
            return res.status(500).json({ message: 'Fayl yuklanmadi' })
         }
      })

      await District.findByIdAndUpdate(districtId, {
         passportFile: `/uploads/${passportFile.name}`
      }, { new: true });
   }

   if (req.body.name) {
      const name = req.body.name

      if (name === district.name) {
         await District.findByIdAndUpdate(districtId, { name }, { new: true });
      } else {
         const districtExist = await District.findOne({ name });

         if (districtExist) {
            res.status(400);
            throw new Error("Bu nomdagi tumani bazada mavjud!")
         } else {
            await District.findByIdAndUpdate(districtId, { name }, { new: true })
         }
      }
   }
   res.status(200).json({ message: "Muvaffaqqiyatli o'zgartirildi" })
})