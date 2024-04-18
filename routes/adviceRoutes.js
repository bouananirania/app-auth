const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/adviceController');

router.get("/advice",adviceController.advice);

module.exports = router;