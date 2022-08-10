
const User = require("../models/User")
const Wallet = require("../models/wallet")
const ReferCode = require("../models/refercode")


//post api for refer code--
module.exports.AddReferCode = async (req, res) => {
  try {
    const { UserId, PersonReferCode } = req.body;
    if (!(UserId && PersonReferCode)) return res.status(400).json({ message: "Please fill required data" })

    const Existing = await ReferCode.findOne({ UserId: UserId });
      if (Existing) return res.status(400).json({ message: "Already exist" })

    const ParentUser = await User.findOne({ ReferCode: PersonReferCode });
    if (!ParentUser) return res.status(400).json({ message: "Invalid Refer Code" })
    // and the refer code is not it's own
    const Userdata = await User.findOne({ _id: UserId });
    if (Userdata.ReferCode == PersonReferCode) return res.status(400).json({ message: "Invalid Refer Code sssssss" })

    // New Refer Created
    const NewRefer = await ReferCode.create({
      UserId,
      PersonReferCode,
      ParentBonus: 200,
      UserBonus: 30,
    });
    if (!NewRefer) return res.status(400).json({ message: "New Refer Not created" })
    // console.log(NewRefer)
    // Add data in Parent wallet
    const last_payment = await Wallet.findOne({ UserId: ParentUser._id })
    //   res.status(200).json(last_payment)
    let balanceamount = last_payment.balance
    let bonusamount = NewRefer.ParentBonus
    // console.log(last_payment, ParentUser._id);

    let balance = balanceamount + bonusamount
    let GST_applied = Math.round((18 * bonusamount) / 100)
    let amountValue = bonusamount + GST_applied

    const ParentWallet = await Wallet.create({
      UserId: ParentUser._id,
      amount_Paid: bonusamount,
      PaymentType: "Added",
      amountValue: amountValue,
      balance,
      GST_applied,
      PaymentMode: "ReferCode"
    });

    // Add data in User wallet
    const newlast_payment = await Wallet.findOne({ UserId })
    balanceamount = newlast_payment.balance
    bonusamount = NewRefer.UserBonus

    balance = balanceamount + bonusamount
    GST_applied = Math.round((18 * bonusamount) / 100)
    amountValue = bonusamount + GST_applied

    const userWallet = await Wallet.create({
      UserId,
      amount_Paid: bonusamount,
      PaymentType: "Added",
      amountValue: amountValue,
      balance,
      GST_applied,
      PaymentMode: "ReferCode"
    });

    return res.status(200).json({
      message: "New Refer code",
      ParentWallet,
      userWallet,
      NewRefer,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
}
//--get api for refer code
module.exports.ReferCodeView = async (req, res) => {
  try {
    // const getReferCode = await ReferCode.find({});
    const getReferCode = await ReferCode.find({ }).sort({ '_id': -1 })
    if (!getReferCode) {
      res.status(400).json({ message: "something went Wrong ", status: false });
    } else {
      res.status(200).json({
        message: "Refer Code Details  is Created successfully",
        data: getReferCode,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//Get By Id
module.exports.ViewRefertGetByID = async (req, res) => {
  try {
    const getReferCode = await ReferCode.findOne({ _id: req.params.id }).sort({ '_id': -1 })
    if (!getReferCode) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "getReferCode Details Created successfully",
        data: getReferCode,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

