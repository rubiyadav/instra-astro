const moment = require('moment')
const myNotifaction  = require('../models/notifaction');

 
 exports.AddNotifaction = async (req,res) => {
    try{
    const orderNotifaction =  `Congratulation your Order is Successfully done ${moment().format('DD-MM-YYYY')}`
    const notifaction = new myNotifaction()
    notifaction.user = req.user
    notifaction.notifaction = orderNotifaction
    notifaction.save()
    return res.status(201).json({
        message:"Congratulation your order confirm",
        notifaction
    }) 

    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Something Went Wrong"
        })
    }
 }

 exports.getNotifaction = async(req,res) => {
    try{
        const getNotifaction = await myNotifaction.find({user:req.user})
        .populate('user')
        res.status(200).json({message:"Get Notifaction Successfully",getNotifaction})
       }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
 }