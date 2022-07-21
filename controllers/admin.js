const bookidgen = require("bookidgen");
const Banner = require('../models/Banner')
const moment = require("moment");
// const product = require('../models/product')
const { encrypt, compare } = require('../services/crypto');
const User = require('../models/User');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = 'rubi'
const bcrypt = require("bcrypt")



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

//SignUP
module.exports.signUpUser = async (req, res) => {
  const { user_Name, mobile_Number, password } = req.body;

  // Check if user already exist
  const Existing = await User.findOne({ mobile_Number })
  if (Existing) {
    return res.send('Already existing');
  }
  encryptedPassword = await bcrypt.hash(password, 10);


  // create new user
  const newUser = await createUser(user_Name, mobile_Number, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};

const createUser = async (user_Name, mobile_Number, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = Math.floor(1000 + Math.random() * 90000)
  const newUser = await User.create({
    user_Name, mobile_Number,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    sendSMS(`+91${mobile_Number}`, otpGenerated)

    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};




//login ------

module.exports.login = async (req, res) => {

  try {
    const { mobile_Number, password } = req.body;

    if (!(mobile_Number && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ mobile_Number });

    if (user && (await compare(password, user.password))) {
      jwt.sign({ user_id: user._id }, JWTkey, { expiresIn: '3h' }, (err, token) => {
        if (err) res.status(400).send("Invalid Credentials");
        res.send({ user, token });
      }
      );

    }

  } catch (err) {
    console.log(err);
  }

};


//post Banner

module.exports.postBanner = async (req, res) => {
  let { imgUrl } = req.body;

  try {
    if (!(imgUrl)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const banner = await Banner.create({
        imgUrl,
        id: bookidgen("ID", 14522, 199585),
        time: moment().format("llll"),
      });

      if (!banner) {
        res.json({ message: "Banner is not created", status: false });
      } else {
        res.json({
          message: "banner is created successfully",
          data: banner,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//get banner

module.exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ id: req.params.id });
    if (!banner) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "banner is found",
        data: banner,
        status: true
      });


    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//patch for Baner 
module.exports.patchbanner = async (req, res, next) => {
  let { imgUrl } = req.body;
  try {
    const banner = await Banner.findOneAndUpdate(
      { _id: req.params.id },
      {
        imgUrl

      },
      { new: true }
    );
    if (!banner) {
      res.json({ message: "Banner not updated", status: false });
    } else {
      res.json({
        message: "Banner updated successfully",
        status: true,
        banner: banner,
      });
    }
  } catch (error) { }
}

//delete for banner

module.exports.DeleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findOneAndDelete({ id: req.params.id });
    if (!banner) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: "banner is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};



