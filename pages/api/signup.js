import User from "@/Models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try{

      const {name,email} = req.body;
        let u = new User({name,email,password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()});
        await u.save();
        res.status(200).json({ success: "success" });
    }catch(e){
        res.status(400).json({error:"Internal server error"})
    }
  } else {
    res.status(400).json({ error: "Wrong method" });
  }
};

export default connectDb(handler);
