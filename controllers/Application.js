
const bookidgen = require("bookidgen");
const cart = require('../models/cart')
const Address = require('../models/Address')
const Payment = require('../models/payment')
const Order = require('../models/Order')

// Cart post api

module.exports.postCart = async (req, res) => {
  let { User_id, Products } = req.body;

  try {
    if (!(User_id && Products)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const Cart = await cart.create({
        User_id, Products,
        id: bookidgen("ID", 14522, 199585),
      });

      if (!Cart) {
        res.json({ message: "Cart is not created", status: false });
      } else {
        res.json({
          message: "Cart is created successfully",
          data: Cart,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//get api for Cart

module.exports.getCart = async (req, res) => {
  try {
    const Cart = await cart.findOne({ id: req.params.id });
    if (!Cart) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Cart is found",
        data: Cart,
        status: true
      });


    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//Cart for Patch

module.exports.CartPatch = async (req, res, next) => {
  let { User_id, Products } = req.body;
  try {
    const Cart = await cart.findOneAndUpdate(
      { _id: req.params.id },
      {
        User_id,
        Products,

      },
      { new: true }
    );
    if (!Cart) {
      res.json({ message: "Carts not updated", status: false });
    } else {
      res.json({
        message: "Carts updated successfully",
        status: true,
        Cart: Cart,
      });
    }
  } catch (error) { }
}


//Delete Api
module.exports.DeleteCart = async (req, res) => {
  try {
    const Cart = await cart.findOneAndDelete({ id: req.params.id });
    if (!Cart) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: "carts is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

//Post API for Address

module.exports.postAddress = async (req, res) => {
  let { Street, Area, City, State, Country, User_ID } = req.body;

  try {
    if (!(User_ID && Street && Area && City && State && Country)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const address = await Address.create({
        User_ID, Street,Area,City,State,Country,
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
    const address = await Address .findOneAndDelete({ id: req.params.id });
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


// post api for product orderd

module.exports.postOrder = async (req, res) => {
  let { User_id, Cart_id, Default_address, OrderStatus, Default_payment_id } = req.body;

  try {
    if (!(User_id && Cart_id && Default_address && Default_payment_id && OrderStatus)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const orders = await Order.create({
        User_id,
        Cart_id,
        Default_address,
        OrderStatus,
        Default_payment_id,
        id: bookidgen("ID", 14522, 199585),
      });

      if (!orders) {
        res.json({ message: "orders is not confermed", status: false });
      } else {
        res.json({
          message: "orders is created successfully",
          data: orders,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

