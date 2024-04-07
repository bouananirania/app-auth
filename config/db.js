// Connexion à la base de données des patients
const patientDB = mongoose.createConnection("mongodb+srv://patients:patients@patients.5m4b6xi.mongodb.net/?retryWrites=true&w=majority&appName=patients");

patientDB.on('connected', () => {
  console.log("Connexion à la base de données des patients réussie");
});

patientDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des patients :", err);
});

module.exports = {patientDB};
