const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);//checked
router.post('/login', userController.loginUser);//checked
router.put('/update', userController.updateUser);//checked
router.get('/getdata',userController.getuserdata);//checked

module.exports = router;
