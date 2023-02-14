const express = require('express');
const router = express.Router();
const { internalBranchController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/token.middleware');

router.get('/', internalBranchController.getAll);
router.get('/:id', internalBranchController.getOne)
router.post('/create', verifyAdminToken, internalBranchController.create);

module.exports = router;