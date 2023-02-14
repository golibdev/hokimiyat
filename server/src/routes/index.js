const expres = require('express');
const router = expres.Router();
const userRoute = require('./user.route');
const districtRoute = require('./district.route');
const branchRoute = require('./branch.route');
const internalBranchRoute = require('./internalBranch.route');
const projectRoute = require('./project.route')

router.use('/user', userRoute);
router.use('/district', districtRoute);
router.use('/branch', branchRoute);
router.use('/internal-branch', internalBranchRoute);
router.use('/project', projectRoute)

module.exports = router;