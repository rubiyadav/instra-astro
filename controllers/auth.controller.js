const { encrypt, compare } = require('../services/crypto');
// const { generateOTP } = require('../services/OTP');
// const { sendMail ,forgotPassword } = require('../services/MAIL');
const User = require('../models/User');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const JWTkey = 'rubi'
const auht = require("./middleware/auth");


const from = "+19287568632"
const sendSMS = async (to, from, otp) => {
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

module.exports.sendsms = async (req, res) => {
  const message = await sendSMS(to, from, otp)
  console.log(message);
  res.status(200).json({ message: "otp send sussec fullly", otp })
}

var isAuthenticated = function (req, res, next) {
  console.log(req.headers)
  var token = req.headers["authorization"];
  console.log("mytoken is " + token);
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: "You have to login first before you can access your lists.",
      data: null
    });
  }

  jwt.verify(token, JWTkey, function (err, decodedToken) {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: "Login timed out, please login again.",
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};
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
    sendSMS(`+91${mobile_Number}`, from, otpGenerated)
    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};




// Verify
module.exports.verify_Mobile_Number = async (req, res) => {
  const { mobile_Number, otp } = req.body;

  const user = await User.findOne({ mobile_Number });
  if (!user) {
    res.send('User not found');
  }
  if (user && user.otp !== otp) {
    res.send('Invalid OTP');
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });

  res.send(updatedUser);
};


//Reset Password

module.exports.RestPassword = async (req, res) => {
  const { mobile_Number } = req.body;

  // Check if user already exist
  const user = await User.findOne({ mobile_Number })
  if (!user) {
    return res.send('No User existing');
  }
  const otpGenerated = Math.floor(1000 + Math.random() * 90000)
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { otp: otpGenerated },
  });
  if (!updatedUser) {
    return res.send('Unable to Generate otp')
  }
  try {
    sendSMS(`+91${mobile_Number}`, from, otpGenerated)
    return res.status(200).json({
      message: "SMSS Send",
      Otp: otpGenerated
    });
  } catch (error) {
    return res.send('Unable to Send Mail, Please try again later', error);
  }

};


//RestPasswordLink ---

module.exports.RestPasswordLink = async (req, res) => {
  const { password, mobile_Number } = req.body;

  const user = await User.findOne({ mobile_Number })
  if (!user) {
    return res.send('No User existing');
  }
  const hashedPassword = await encrypt(password);
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { password: hashedPassword },
  });
  if (!updatedUser) {
    return res.send('Password not Updated');
  } else {
    return res.send('Password Updated');
  }
};

//.RestPasswordOtp

module.exports.RestPasswordOtp = async (req, res) => {
  const { otp, mobile_Number } = req.body;

  const user = await User.findOne({ mobile_Number })
  if (user.otp == otp) {
    return res.send('Correct OTP');
  } else {
    return res.status(200).json({
      message: 'No User existing',
      otp
    });
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
      const token = jwt.sign(
        { user_id: user._id },
        JWTkey,
        {
          expiresIn: "8h",
        }
      );
      res.send({ user, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }

};

//new Password

module.exports.newPassword = async (req, res) => {
  const { password, mobile_Number } = req.body;

  const user = await User.findOne({ mobile_Number })
  if (!user) {
    return res.send('No User existing');
  }
  const hashedPassword = await encrypt(password);
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { password: hashedPassword },
  });
  if (!updatedUser) {
    return res.send('Password not Updated');
  } else {
    return res.send('Password Updated');
  }
};

//patch api---
module.exports.patchEditProfile = async (req, res, next) => {
  let { Image, mobile_Number, password, Name } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        Image,
        Name,
        mobile_Number,
        password,

      },
      { new: true }
    );
    if (!user) {
      res.json({ message: "Data not updated", status: false });
    } else {
      res.json({
        message: "Data updated successfully",
        status: true,
        user: user,
      });
    }
  } catch (error) { }
}

//patch for roles 
module.exports.patchRoles = async (req, res) => {
  let { roles } = req.body;

  try {
    if (!(roles)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const user = await User.findByIdAndUpdate({ _id: req.params.id }, {
        roles,
        // id: bookidgen("ID", 14522, 199585),
      });
      if (!user) {
        res.send('Unable to add user');
      }
      res.send(user);
    }
  } catch {

  }
}

//Update user Profile

module.exports.updateUser = async (req, res) => {
  try {
    const profile = req.file ? req.file : null

    const { name, } = req.body

    const updateUser = User.findByIdAndUpdate(req.params.id, {
      profile,
      name
    })
    return res.status(200).json({
      message: "SuccessFully update",
      data: updateUser
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message
    })
  }
}