const mongoose = require('mongoose');
const Advice = require('../models/advice');
const User = require('../models/user');

// Fonction pour rechercher et marquer les nouveaux conseils
const searchAndMarkNewAdvices = async () => {
  try {
    // Récupérer la liste des IDs des utilisateurs depuis la base de données
    const users = await User.find({}, '_id');
    const userIds = users.map(user => user._id);

    // Récupérer les conseils pour lesquels l'ID de l'utilisateur est dans la liste des IDs récupérée
    const advices = await Advice.find({ userId: { $in: userIds }, isNew: false });

    // Marquer les nouveaux conseils comme nouveaux
    await Advice.updateMany({ _id: { $in: advices.map(adv => adv._id) } }, { $set: { isNew: true } });
  } catch (error) {
    console.error('Erreur lors de la recherche et de la mise à jour des nouveaux conseils :', error);
  }
};

// Appeler la fonction toutes les 5 minutes
setInterval(searchAndMarkNewAdvices, 5 * 60 * 1000); // 5 minutes en millisecondes

// Exporter la fonction pour une utilisation dans d'autres parties de l'application si nécessaire
module.exports = searchAndMarkNewAdvices;
