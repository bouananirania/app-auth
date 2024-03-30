const User = require('./userModel');
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, idPulse, dateOfBirth, bloodType, wilaya, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).send("Les mots de passe ne correspondent pas");
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("L'utilisateur existe déjà");
        }
        
        const newUser = new User({ fullName, email, idPulse, dateOfBirth, bloodType, wilaya, password, confirmPassword });
        await newUser.save();
        res.status(201).send("Inscription réussie");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Adresse e-mail incorrecte");
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send("Mot de passe incorrect");
        }
        
        res.status(200).send("Connecté avec succès");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
