const express = require('express');
const router = express.Router();
const { districtController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/token.middleware');

router.get('/', districtController.getAll);
router.get('/:districtId', districtController.getOne)
router.post('/create', verifyAdminToken, districtController.create);
router.put('/:districtId', verifyAdminToken, districtController.update)

module.exports = router;