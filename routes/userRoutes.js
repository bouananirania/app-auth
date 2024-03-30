const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Route  for  registration

router.post('/register', userController.register);

// route for login
router.post('/login', userController.login);



module.exports = router;
