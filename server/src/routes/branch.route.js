const express = require('express');
const router = express.Router();
const { branchController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/token.middleware');

router.get('/', branchController.getAll);
router.get('/:branchId', branchController.getOne)
router.post('/create', verifyAdminToken, branchController.create);

module.exports = router;