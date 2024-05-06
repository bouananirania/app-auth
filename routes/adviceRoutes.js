const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/adviceController');

router.get('/message', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    const intervalId = setInterval(() => {
        adviceController.advice(req, res);
    }, 10000);
  
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
  });
  module.exports = router;