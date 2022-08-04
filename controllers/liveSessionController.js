const LiveSession = require('../models/livesession')
// const moment = require("moment");

// post api

module.exports.LiveSession = async (req, res) => {
  try {
    const {UserId,SessionLink,SessionTime} = req.body;
    if (!(UserId && SessionLink && SessionTime )) res.status(400).json({ message: "No One Is Active" })
    const newlivesession = await  LiveSession .create({ UserId,SessionLink,SessionTime});
    if (!newlivesession) res.status(400).json({ message: "no message", status: false });
    res.status(200).json({
      message: "LiveSession is created successfully",
      data: newlivesession,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}

//patch api

module.exports.LiveSessionActive = async (req, res) => {
  try {
    const id = req.params.id
    const Updatelivesession = await  LiveSession .findOneAndUpdate({_id:id},{ SessionStatus:"Active" });
    if (!Updatelivesession) res.status(400).json({ message: "Session Not Active", status: false });
    res.status(200).json({
      message: "Session is Active",
      data: Updatelivesession,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}

//LiveSessionUpdate
module.exports.LiveSessionUpdate = async (req, res) => {
  try {
    const {SessionStatus} = req.body;
const id = req.params.id
    if (!(SessionStatus)) res.status(400).json({ message: "No One Is Active" })
    const Updatelivesession = await  LiveSession .findOneAndUpdate({_id:id},{SessionStatus});
    if (!Updatelivesession) res.status(400).json({ message: "Unable to Update Session", status: false });
    res.status(200).json({
      message: "Updated Session",
      data: Updatelivesession,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}

//---UpcommingLiveSession 
module.exports.UpcommingLiveSession = async (req, res) => {
  try {
    const Upcomminglivesession = await  LiveSession .find({SessionStatus:"Upcomming"});
    if (!Upcomminglivesession) res.status(400).json({ message: "No Session", status: false });
    res.status(200).json({
      message: "Upcomming Session",
      data: Upcomminglivesession,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}

//---ActiveLiveSession
module.exports.ActiveLiveSession = async (req, res) => {
  try {
    const ActiveLiveSession = await  LiveSession .find({SessionStatus:"Active"});
    if (!ActiveLiveSession) res.status(400).json({ message: "No Session", status: false });
    res.status(200).json({
      message: "Active Session",
      data: ActiveLiveSession,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}









// //Complete Session---
// module.exports.LiveSessionCompleted = async (req, res) => {
//   try {
//     const id = req.params.id
//     const Updatelivesession = await  LiveSession .findOneAndUpdate({_id:id},{ SessionStatus:"Completed" });
//     if (!Updatelivesession) res.status(400).json({ message: "Session Not Completed", status: false });
//     res.status(200).json({
//       message: "Session is Completed",
//       data: Updatelivesession,
//       status: true,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// }




// time: moment().format("llll")