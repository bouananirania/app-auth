const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bpmg= require('../models/user');
class serviceuser{
    static async getdata(userId){
        try{
        const data=await user.find({userId})
        return data;
  
        }catch(err){console.log(err)}
      }
    static async getbpm(Bpm,pulseid){
        try{
        const bpmg=new user({Bpm,idPulse})
        return await bpmg.save();
           }catch(err){console.log(err)}
      }

      static async findUserByIdPulse(idPulse){
        try {
            const userinfo = await user.findOne({ idPulse });
    
            if (userinfo) {
                return { fullName: user.fullName, userId: user._id };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur par idPulse:", error);
            return null;
        }

      }
     
     static async generatetoken(tokendata,secretkey,jwt_expire){
        return jwt.sign(tokendata,secretkey,{expiresIn:jwt_expire})
    }

    }

   
module.exports=serviceuser;