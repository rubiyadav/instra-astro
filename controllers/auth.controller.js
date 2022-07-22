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


module.exports.isAuthenticated = function (req, res, next) {
  console.log(req.headers)
  var token = req.headers["x-access-token"];
  console.log("mytoken is " + token);
  if (!token) res.send("You have to login first before you can access your lists.")

  jwt.verify(token, JWTkey, (err) => {

    if (err) {

      res.send("not Autori")

    } else {
      next()

    }
  })


};


//SignUP
module.exports.signUpUser = async (req, res) => {
  const { user_Name, mobile_Number, password } = req.body;

  // Check if user already exist
  const Existing = await User.findOne({ mobile_Number })
  if (Existing) {
    return res.status(400).json({
      message: "Allready existing"
    });
  }
  encryptedPassword = await bcrypt.hash(password, 10);


  // create new user
  const newUser = await createUser(user_Name, mobile_Number, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.status(200).json(newUser);
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
    // sendSMS(`+91${mobile_Number}`, otpGenerated)

    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

//user login----
module.exports.login = async (req, res) => {

  try {
    const { mobile_Number, password } = req.body;

    if (!(mobile_Number && password)) {
      res.status(400).json({ message: "All input is required" });
    }

    const user = await User.findOne({ mobile_Number });

    if (!user) res.status(400).json({
      message: 'this number is not registered'

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



// Verify
module.exports.verify_Mobile_Number = async (req, res) => {
  const { mobile_Number, otp } = req.body;

  const user = await User.findOne({ mobile_Number });
  console.log(user)
  if (!user) {
    res.send('User not found');
  }
  if (user && user.otp !== otp) {
    res.status(400).json({
      message: "Invalid otp"
    });
  }
  const updatedUser = await User.findOneAndUpdate({ _id: user }, {
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
    return res.status(400).json({
      message: "User not existing"
    });
  }
  const otpGenerated = Math.floor(10000 + Math.random() * 90000)
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { otp: otpGenerated },
  });
  if (!updatedUser) {
    return res.status(400).json({
      message: "Unable to Generate otp"
    })
  }
  try {
    // sendSMS(`+91${mobile_Number}`, otpGenerated)
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
  const { newpassword, confirmpassword } = req.body;

  if (newpassword !== confirmpassword || newpassword.length < 5) res.send("password invalid")

  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    return res.status(400).json({
      message: "User not existing"
    });
  }
  const hashedPassword = await encrypt(newpassword);
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { password: hashedPassword },
  });
  if (!updatedUser) {
    return res.send('Password not Updated');
  } else {
    return res.send([updatedUser, 'Password Updated']);
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





//Forget password
module.exports.ForgetPassword = async (req, res) => {
  const { mobile_Number } = req.body;

  // Check if user already exist
  const user = await User.findOne({ mobile_Number })
  if (!user) {
    return res.status(400).json({
      message: "User not existing"
    });
  }
  const otpGenerated = Math.floor(10000 + Math.random() * 90000)
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { otp: otpGenerated },
  });
  if (!updatedUser) {
    return res.status(400).json({
      message: "Unable to Generate otp"
    })
  }
  try {
    // sendSMS(`+91${mobile_Number}`, otpGenerated)
    return res.status(200).json({
      message: "SMSS Send",
      Otp: otpGenerated
    });
  } catch (error) {
    return res.send('Unable to Send Mail, Please try again later', error);
  }

};

