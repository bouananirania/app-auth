
const User = require('../models/user');
const userserv =require('../services/usersrvc');
const { patientDB } = require('../config/db');
const notifier = require('node-notifier');

exports.sendLatestBpmToClient = async (req, res) => {
  const userId = req.params.userId; 
  try {
      const latestBpmEntry = await bpm.findOne({ userId: userId }).sort({ timestamp: -1 });

      if (latestBpmEntry) {
          const { idPulse, bpm } = latestBpmEntry;
          const data = JSON.stringify({ idPulse, bpm });
          res.write(`data: ${data}\n\n`);
          await checkAndSendNotifications(idPulse, bpm);
          //await bpm.findByIdAndDelete(latestBpmEntry._id);
      } else {
          res.write('data: No data available\n\n'); // Envoyer une réponse même si aucune donnée n'est trouvée
      }
  } catch (err) {
      console.error('Erreur lors de la gestion des données bpm pour l\'utilisateur ID:', userId, err);
      res.status(500).send('Internal Server Error');
  }
};



const checkAndSendNotifications = async (idPulse, bpm) => {
    if (bpm < 60 || bpm > 100) {
        try {
            const userData = await userserv.findUserByIdPulse(idPulse);

            if (userData) {
                const { fullName, userId } = userData;
                sendNotification(`Alerte de fréquence cardiaque anormale pour l'utilisateur ${fullName} (ID: ${userId}) : ${bpm}`);
            } else {
                console.log("Aucun utilisateur trouvé avec l'idPulse spécifié.");
            }
  } catch (err) {
    console.error('Erreur lors de la vérification et de l\'envoi de notifications :', err);
  }}
};

const sendNotification = (message) => {
    notifier.notify({
        title: 'Alerte de fréquence cardiaque',
        message: message,
        sound: true,
        wait: true
    });
}; 