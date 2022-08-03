const Message = require('../models/Message');

const moment = require("moment");
// creating user
module.exports.SaveMessageByUsers= async(req, res)=> {
  try {
    const {content, from, time, date,to} = req.body;
    if(!(content&& from&& time&& date&&to)) res.status(400).json({message:"Message not saved"})
    const newMessage = await Message.create({content, from, date,to, time: moment().format("llll"),});
if (!newMessage) res.status(400).json({ message: "no message", status: false });
    res.status(200).json({
          message: "message is created successfully",
          data: newMessage,
          status: true,
        });
  } catch (error) {
   res.status(400).json({ message: error.message, status: false });
}
}













//     const {content, from, time, date,to} = req.body;
//     if(!(content&& from && time&& date&&to)) res.status(400).json({message:"Message not saved"})
//     const newMessage = await Message.create({content, from, time, date,to});
//     res.status(201).json(newMessage);
//   } catch (e) {
//     let msg;
//     if(e.code == 11000){
//       msg = "User already exists"
//     } else {
//       msg = e.message;
//     }
//     console.log(e);
//     res.status(400).json(msg)
//   }
// }

// login user

module.exports.getMessageByUsers= async(req, res)=> {
  try {
    const {to, from} = req.query;
    const message = await Message.find({ $or: [
        { $and: [{to}, {from}] },
        { $and: [{to:from}, {from:to}] }
    ]});
    res.status(200).json(message);
  } catch (e) {
      res.status(400).json(e.message)
  }
}
