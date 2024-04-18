const mongoose = require('mongoose');
const Advice = require('../models/advice');
const User = require('../models/user');

exports.advice= async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ status: false, message: "Authorization header is missing" });
        }
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, 'secretKey');
        const userId = decodedToken.id;
      const newAdvices = await Advice.find({ userId, isNew: true });
  
      if (newAdvices.length > 0) {
        await Advice.updateMany({ userId, isNew: true }, { $set: { isNew: false } });
  
        res.json({ status: true, newAdvices });
      } else {
        res.json({ status: false, message: 'Aucune notification' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des nouveaux conseils :', error);
      res.status(500).json({ status: false, message: 'Erreur serveur' });
    }
  };
  