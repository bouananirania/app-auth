const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/app_db", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Création d'un schéma utilisateur avec Mongoose
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idPulse: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    bloodType: { type: String, required: true },
    wilaya: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword:{ type: String, required: true }
});

// Création d'un modèle utilisateur à partir du schéma
const User = mongoose.model("User", userSchema);

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { idPulse,fullName, email, dateOfBirth, bloodType, wilaya, password, confirmPassword } = req.body;
    // Vérifier si le mot de passe et le mot de passe de confirmation sont identiques
    if (password !== confirmPassword) {
      return res.status(400).send("Les mots de passe ne correspondent pas");
    }
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("L'utilisateur existe déjà");
    }
    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer un nouvel utilisateur avec Mongoose
    const newUser = new User({ fullName, email, dateOfBirth, bloodType, wilaya, password: hashedPassword });
    await newUser.save();
    res.status(201).send("Inscription réussie");
  } catch (err) {
   
    res.status(500).send({ message: err.message });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Trouver l'utilisateur dans la base de données
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Adresse e-mail incorrecte");
    }
    // Vérifier si le mot de passe correspond
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }
    res.status(200).send("Connecté avec succès");
  } catch (err) {
    res.status(500).send({ message: err.message });





  }
});


app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
