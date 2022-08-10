
const LiveSession = require('../models/livesession')
const UserDetail = require('../models/userDetails')
const moment = require("moment");
// const moment = require("moment");

// post api

module.exports.LiveSession = async (req, res) => {
  try {
    const {UserId,SessionLink} = req.body;
    if (!(UserId && SessionLink )) res.status(400).json({ message: "No One Is Active" })
    const newlivesession = await  LiveSession .create({ UserId,SessionLink,SessionTime: moment().format("lll"),});
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
    let Updatelivesession = await  LiveSession .findOneAndUpdate({_id:id},{ SessionStatus:"Active" });

    if (!Updatelivesession) res.status(400).json({ message: "Session Not Active", status: false });
    res.status(200).json({
      message: "Session is Active",
      data: Updatelivesession,
          SessionTime: moment().format("lll"),
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
      message: "Active",
        SessionTime: moment().format("lll"),
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
    let Upcomminglivesession = await  LiveSession.find({ SessionStatus:"Upcomming" });
    let senddata=[]
    for (let i = 0; i < Upcomminglivesession.length; i++) {
      
      let datas= await  UserDetail.findOne({ User_ID: Upcomminglivesession[i].UserId });
      var maindata= { "Upcoming": Upcomminglivesession[i],Userdata:datas }
      
      senddata.push(maindata)
      console.log(maindata,"datas");


      
    }
    if (!senddata) res.status(400).json({ message: "No Session", status: false });
    res.status(200).json({
      message: "Upcomming Session",
      data: senddata,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}

//---ActiveLiveSession
module.exports.ActiveLiveSession = async (req, res) => {
  try {
    let ActiveLiveSession = await  LiveSession .find({SessionStatus:"Active"});
    let senddata=[]
    for (let i = 0; i < ActiveLiveSession.length; i++) {
      
      let datas= await  UserDetail.findOne({ User_ID: ActiveLiveSession[i].UserId });
      var maindata= { "Upcoming": ActiveLiveSession[i],Userdata:datas }
      
      senddata.push(maindata)
      console.log(maindata,"datas");
  
    }
    if (!senddata) res.status(400).json({ message: "No Session", status: false });
    res.status(200).json({
      message: "ActiveLive Session",
      data: senddata,
      status: true,
    
    });

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}


