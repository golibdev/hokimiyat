const expres = require('express');
const router = expres.Router();
const { userController } = require('../controllers');

router.post('/signup', userController.register);
router.post('/signin', userController.login);

module.exports = router;