const User = require('../models/user');
const bcrypt = require("bcrypt");
const userserv = require("../services/usersrvc");
const bpm= require('../models/bpm');

exports.registerUser = async (req, res) => {
    try {
        const{ fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password,confirmPassword,details,maladie,gender } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).send("Les mots de passe ne correspondent pas");
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("L'utilisateur existe déjà");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password: hashedPassword,details,maladie,gender });
        await newUser.save();
        const newbpm = new bpm({userId: savedUser._id, idPulse  });
        await newbpm.save();
        /*let tokendata ={id:newUser._id,email:newUser.email,fullName:newUser.fullName,password:newUser.password,age:newUser.age};
        var token =await userserv.generatetoken(tokendata,'secretKey',"4h");*/
        res.json({status:true,success:newUser});
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
        let tokendata ={id:user._id,email:user.email,fullName:user.fullName,password:user.password,age:user.age};
        var token =await userserv.generatetoken(tokendata,'secretKey',"4h");
        res.json({status:true,token:token});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getuserdata=async(req,res)=>{
    try {
    const {userId}=req.body;
    const userData = await userserv.getdata(userId); 
    res.json({ status: true, success: userData });
      } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Une erreur s'est produite lors de la récupération des données de l'utilisateur." });
  }};
  exports.updateUser = async (req, res) => {
    try {
      const userId = req.body.userId;
      const { fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password,details,maladie,gender } = req.body;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
      const updatedUser = await User.findByIdAndUpdate(userId, { fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password: hashedPassword,details,maladie,gender }, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
            res.json({ success: true, user: updatedUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'utilisateur' });
      }
    };
  
