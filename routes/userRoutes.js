const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update', userController.updateUser);
router.get('/getdata',userController.getuserdata);

module.exports = router;
