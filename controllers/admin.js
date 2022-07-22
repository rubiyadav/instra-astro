const bookidgen = require("bookidgen");
// const Banner = require('../models/Banner')
const moment = require("moment");
// const product = require('../models/product')
const { encrypt, compare } = require('../services/crypto');
// const User = require('../models/User');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = 'rubi'
const bcrypt = require("bcrypt")
const Admin = require('../models/Admin')


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
  const Existing = await Admin.findOne({ mobile_Number })
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
  const newUser = await Admin.create({
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

    const user = await Admin.findOne({ mobile_Number });

    if (!user) res.status(400).json({
      message: 'This Number is not registered'

    })

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



