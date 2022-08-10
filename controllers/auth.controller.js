
const User = require('../models/User');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = 'rubi'
const otp = require('../services/OTP');
const Wallet = require('../models/wallet')

// const Wallet = require('../models/wallet')
const Notifications = require('../models/userSetting');
const wallet = require('../models/wallet');
// const { status } = require('express/lib/response');

const generateJwtToken = (id) => {
  return jwt.sign({ id },JWTkey, {
    expiresIn: "7d",
  });
};

const sendSMS = async (to, otp) => {
  const from = "+19287568632"
  await client.messages
    .create({
      body: otp,
      from: from,
      to: to
    })
    .then(message => {
      console.log(message.sid);
      return message
    });
}

exports.isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    console.log('entered authorization')
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWTkey);
    req.user = user.id;
    next();
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }

};

exports.userMiddleware = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user).exec((err, user) => {
    if (user) {
      next();
    }
    if
      (err) {
      return res.status(400).json({
        message: "User access denied"
      })
    }

  })
};


// Verify
module.exports.verify_Mobile_Number = async (req, res) => {
  const { mobile_Number, otp } = req.body;
  const user = await User.findOne({ mobile_Number });
  if (!user)  res.send('User not found');
  if (user && user.otp !== otp) res.status(400).json({message: "Invalid otp"});
  const token=generateJwtToken(user._id)
  res.status(200).json({token});
};

//SignUp

module.exports.signUpUser = async (req, res) => {
  const { mobile_Number } = req.body;
  let Existing = await User.findOne({ mobile_Number })
  const otpGenerated = Math.floor(100000 + Math.random() * 900000)
  if (Existing) {
    Existing.otp = otpGenerated
    const existinguser = await Existing.save()


    // sendSMS(`+91${mobile_Number}`, otpGenerated)
    if (existinguser) res.status(200).json(existinguser);
    res.status(400).json({ message: "no otp" });

  } else {
    const ReferCode = otp.generateOTP()
    const newUser = await User.create({ mobile_Number, otp: otpGenerated, ReferCode });
    const Wallet = await wallet.create({ UserId: newUser._id })
    const notification = await Notifications.create({ UserId: newUser._id })

    // sendSMS(`+91${mobile_Number}`, otpGenerated)
    if (!newUser) res.status(400).json({ message: "Unable to sign you up" });
    res.status(200).json({ newUser, Wallet, notification });
  }
};


//patch api
module.exports.updateUserProfile =  async(req,res) => {
  const {first_Name, last_Name, gender, time_of_Birth, place_of_Birth, profile_Images} = req.body;
  console.log("req.user",req.user);
  if(!(first_Name&& last_Name&& gender&&  time_of_Birth&& place_of_Birth&& profile_Images)) res.status(400).json({message:"Reuired fields"});
  // let u = await User.find({_id:req.user})
  // res.send(u)
  const UpdateUser = await User.findByIdAndUpdate(req.user,{first_Name, last_Name, gender,  time_of_Birth, place_of_Birth, profile_Images});
  if (!UpdateUser)res.status(400).json({message:"Enter the correct Id",status:false});
  res.status(200).json ({
    message:'Udpate is successfully',status:true,UpdateUser
  })

}


// /get api

module.exports.GetUserProfiles = async (req, res, next) => {
  console.log(req.user)
  try {
    const UpdateUser = await User.findById(req.user);
    return res.status(200).json({
      success: true,
      msg: "UpdateUser",
      UpdateUser: UpdateUser
    })
  } catch (error) {
    next(error);
  }
}


//get api
module.exports.getuserwallet = async (req, res) => {
  try {
    const getUserWallet = await Wallet.find({ UserId: req.params.id })
    
    if (!getUserWallet) {
      res.status(400).json({ message: "something went Wrong ", status: false });
    } else {
      res.status(200).json({
        message: "User Wallet Details  is Created successfully",
        data: getUserWallet,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//find one]
module.exports.getuserWalletFindOne= async (req, res) => {
  try {
    const getUserWallet = await Wallet.findOne({ UserId: req.params.id }).sort({ '_id': -1 })

    if (!getUserWallet) {
      res.status(400).json({ message: "something went Wrong ", status: false });
    } else {
      res.status(200).json({
        message: "User New  Wallet is Created successfully",
        data: getUserWallet,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



