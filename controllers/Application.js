
const bookidgen = require("bookidgen");
const Address = require('../models/Address')
const Payment = require('../models/payment')
// const Order = require('../models/Order')
const Tracking_order = require("../models/Tracking_Order");

//Post API for Address

module.exports.postAddress = async (req, res) => {
  let { Street, Area, City, State, Country, User_ID } = req.body;

  try {
    if (!(User_ID && Street && Area && City && State && Country)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const address = await Address.create({
        User_ID, Street, Area, City, State, Country,
        id: bookidgen("ID", 14522, 199585),
      });

      if (!address) {
        res.json({ message: "Address is not created", status: false });
      } else {
        res.json({
          message: "Address is created successfully",
          data: address,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


// get api for Address

module.exports.getAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ id: req.params.id });
    if (!address) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Address is found  successfully",
        data: address,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//patch Api for address

module.exports.AddressPatch = async (req, res, next) => {
  let { Street, Area, City, State, Country, User_ID } = req.body;
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id },
      {
        User_ID,
        Street,
        Area,
        City,
        State,
        Country,
        id: bookidgen("ID", 14522, 199585),

      },
      { new: true }
    );
    if (!address) {
      res.json({ message: "Address not updated", status: false });
    } else {
      res.json({
        message: "Address updated successfully",
        status: true,
        address: address,
      });
    }
  } catch (error) { }
}


//Delete Api for address
module.exports.DeleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ id: req.params.id });
    if (!address) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: " Address is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


//post api for Payment 
module.exports.postPayment = async (req, res) => {
  let { User_id, CardName, CardNo, ExpiryDate, Cvv } = req.body;

  try {
    if (!(User_id && CardName && CardNo && ExpiryDate && Cvv)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const payments = await Payment.findOne({ User_id });
      if (!payments) {
        const paymentdata = await Payment.create({
          User_id,
          CardName,
          CardNo,
          ExpiryDate,
          Cvv,
        });
        if (!paymentdata) {
          res.send('Unable to add payment');
        }
        res.send(paymentdata);
      }
    }
  } catch {

  }
}

//Patch api
module.exports.patchPayment = async (req, res) => {
  let { User_id, CardName, CardNo, ExpiryDate, Cvv } = req.body;

  try {
    if (!(User_id && CardName && CardNo && ExpiryDate && Cvv)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const updatedPayment = await Payment.findByIdAndUpdate({ _id: req.params.id }, {
        CardName,
        CardNo,
        ExpiryDate,
        Cvv
      });
      if (!updatedPayment) {
        res.send('Unable to add payment');
      }
      res.send(updatedPayment);
    }
  } catch {

  }
}

//get api for payment
module.exports.getpayment = async (req, res) => {
  try {
    const payments = await Payment.findOne({ id: req.params.id });
    if (!payments) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "payments is found  successfully",
        data: payments,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};




//Delete api for payment
module.exports.DeletePayment = async (req, res) => {
  try {
    const payments = await Payment.findOneAndDelete({ id: req.params.id });
    if (!payments) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: " Address is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


//post api for tracking order
module.exports.postTrackingOrder = async (req, res) => {
  let { Order_id, order_Location, OrderStatus, order_PaymentMode, order_PaymentStatus } = req.body;

  try {
    if (!(Order_id && order_Location && OrderStatus && order_PaymentMode && order_PaymentStatus)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const tarckingorder = await Tracking_order.create({
        Order_id,
        order_Location,
        order_PaymentMode,
        order_PaymentStatus,
        OrderStatus,
        id: bookidgen("ID", 14522, 199585),
      });

      if (!tarckingorder) {
        res.json({ message: "tarckingorder is not created", status: false });
      } else {
        res.json({
          message: "tarckingorder is created successfully",
          data: tarckingorder,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//Get api for tracking order
module.exports.getOrderTracking = async (req, res) => {
  try {
    const tarckingorder = await Tracking_order.findOne({ id: req.params.id });
    if (!tarckingorder) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Tracking_order is found  successfully",
        data: tarckingorder,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Patch api for uudate the tracker order

module.exports.patchOrderTracking = async (req, res) => {
  let { Order_id, order_Location, OrderStatus, order_PaymentMode, order_PaymentStatus } = req.body;

  try {
    if (!(Order_id && order_Location && OrderStatus && order_PaymentMode && order_PaymentStatus)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const tarckingorder = await Tracking_order.findByIdAndUpdate({ _id: req.params.id }, {
        Order_id,
        order_Location,
        order_PaymentMode,
        order_PaymentStatus,
        OrderStatus,
        id: bookidgen("ID", 14522, 199585),
      });
      if (!tarckingorder) {
        res.send('Unable to add payment');
      }
      res.send(tarckingorder);
    }
  } catch {

  }
}

//Delete api for tracking order
module.exports.DeleteOrderTracking = async (req, res) => {
  try {
    const tarckingorder = await Tracking_order.findOneAndDelete({ id: req.params.id });
    if (!tarckingorder) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: "tarckingorder is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

