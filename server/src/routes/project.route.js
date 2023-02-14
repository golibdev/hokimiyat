const express = require('express');
const router = express.Router();
const { projectController } = require('../controllers');
const { verifyAdminToken } = require('../middlewares/token.middleware');

router.get('/', projectController.getAll);
router.get('/filter/:branchId/:internalBranchId', projectController.filterBranchAndInternalBranch)
router.get('/filter-district/:districtId/:branchId/:internalBranchId', projectController.filterBranchInternalBranchAndDistrict)
router.get('/:projectId', projectController.getOne)
router.post('/create', verifyAdminToken, projectController.create);

module.exports = router;