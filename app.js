const express = require("express");
const mongoose = require("mongoose");
const userController = require("./userController");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://patients:patients@patients.5m4b6xi.mongodb.net/patients", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

app.use(express.json());

app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
