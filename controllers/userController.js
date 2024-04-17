const User = require('../models/user');
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, idPulse, age, bloodType, wilaya, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).send("Les mots de passe ne correspondent pas");
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("L'utilisateur existe déjà");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);
        const newUser = new User({ fullName, email, idPulse, dateOfBirth, bloodType, wilaya, hashedPassword, hashedconfirmPassword });
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

exports.getuserdata=async(req,res)=>{
    try {
    const {userId}=req.body;
    /*if (!userId) {
        return res.status(400).json({ status: false, message: "L'identifiant de l'utilisateur est manquant dans la requête." });
    }
    */
    const userData = await userserv.getdata(userId); 
    res.json({ status: true, success: userData });
      } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Une erreur s'est produite lors de la récupération des données de l'utilisateur." });
  }};
  exports.updateUser = async (req, res) => {
    try {
      const userId = req.body;
      const updatedUserData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
            res.json({ success: true, user: updatedUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'utilisateur' });
      }
    };
  