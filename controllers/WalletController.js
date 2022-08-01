const Wallet = require('../models/wallet')


// module.exports.walletPost = async (req, res) => {
//   let {amount_Paid, PaymentType } = req.body

//   try {
//     if (!(amount_Paid && PaymentType)) {
//       res.status(400).json({ message: "All fields are required", status: false });
//     } else {
//       const getResponce = await Wallet.create({
//         amount_Paid,
//         PaymentType
        
//       });

//       if (!getResponce) {
//         res.status(400).json({ message: "Wallet is not found", status: false });
//       } else {
//         res.status(200).json({
//           message: "UserDetails is created successfully",
//           data: getResponce,
//           status: true,
//         });
//       }
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// };
module.exports.walletPost = async (req, res) => {
  let {UserId,amount_Paid, PaymentType,PaymentMode } = req.body

const last_payment = Wallet.findOne({UserId}) 
let balance 
let GST_applied
if(PaymentType=="Added"){
    balance= last_payment.balance+amount_Paid
    GST_applied= Math.round((18 / amount_Paid) * 100)
}else{
     balance= last_payment.balance-amount_Paid
    GST_applied=0
    
}

  try {
    if (!(amount_Paid && PaymentType)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await Wallet.create({
        amount_Paid,
        PaymentType,
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


