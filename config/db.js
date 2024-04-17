const mongoose = require("mongoose");
// Connexion à la base de données des patients
const patientDB = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/patients");

patientDB.on('connected', () => {
  console.log("Connexion à la base de données des patients réussie");
});

patientDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des patients :", err);
});
const bpmdb = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/patients");

bpmdb.on('connected', () => {
  console.log("Connexion à la base de données bpm");
});

bpmdb.on('error', (err) => {
  console.error("Erreur de connexion à la base de données bpm :", err);
});
const advicedb = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/Doctors");

advicedb.on('connected', () => {
  console.log("Connexion à la base de données advice reussie");
});

advicedb.on('error', (err) => {
  console.error("Erreur de connexion à la base de données advice :", err);
});

module.exports = {
  patientDB,
  bpmdb,
  advicedb,
};

