const wallet = require('../models/wallet');
const Wallet = require('../models/wallet')

module.exports.walletPost = async (req, res) => {
  let { UserId, amount_Paid, PaymentType, PaymentMode } = req.body
  //   res.send(req.body)
  const last_payment = await Wallet.findOne({ UserId }).sort({ '_id': -1 })
  let balance
  let GST_applied
  let amountValue
  //   res.status(200).json(last_payment)
  let balanceamount = last_payment.balance
  //   res.send({balanceamount})
  if (PaymentType == "Added") {

    balance = balanceamount + amount_Paid
    GST_applied = Math.round((18 * amount_Paid) / 100)
    amountValue = amount_Paid + GST_applied
  } else {
    balance = balanceamount - amount_Paid
    GST_applied = 0
    amountValue = 0

  }

  try {
    if (!(amount_Paid && PaymentType)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await Wallet.create({
        UserId,
        amount_Paid,
        PaymentType,
        amountValue,
        balance,
        GST_applied,
        PaymentMode
      });

      if (!getResponce) {
        res.status(400).json({ message: "Wallet is not found", status: false });
      } else {
        res.status(200).json({
          message: "UserDetails is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//get api for wallet

module.exports.GetByFind = async (req, res) => {
  const UserId = req.params.id
  try {
    const getwalletDetails = await Wallet.find({ UserId });
    if (!getwalletDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "Wallet Details  is Created successfully",
        data: getwalletDetails,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//Get By ID

module.exports.ViewWalletGetByID = async (req, res) => {
  try {
    const getwalletDetails = await Wallet.findOne({_id: req.params.id });
    if (!getwalletDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "Walletis Created successfully",
        data: getwalletDetails,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


