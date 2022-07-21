const Order = require("../models/Order");
// const OrderAdmin = require("../models/OrderAdmin");
// const Cart = require("../models/Cart");
// const User = require("../models/User");
// const Address = require("../models/Address");




// post api for product orderd

module.exports.postOrder = async (req, res) => {
  let { user, addressId, totalAmount, items, productId, payablePrice
    , purchasedQty, paymentStatus, paymentType, orderStatus, date, isCompleted ,} = req.body;

  try {
    if (!(user && addressId && totalAmount && items && orderStatus && productId && payablePrice && purchasedQty && paymentStatus && paymentType && isCompleted && date  )) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const orders = await Order.create({
        user,
        addressId,
        totalAmount,
        orderStatus,
        items,
        productId,
        payablePrice,
        purchasedQty,
        paymentStatus,
        paymentType,
        date,
        isCompleted
      });

      if (!orders) {
        res.json({ message: "orders is not confermed", status: false });
      } else {
        res.json({
          message: "Order placed successfully",
          data: orders,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//get for order
module.exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.findOne({ id: req.params.id });
    if (!orders) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Order placed successfully",
        data: orders,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//patch for order
module.exports.patchOrder = async (req, res) => {
  let { User_id, Cart_id, Default_address, OrderStatus, Default_payment_id } = req.body;

  try {
    if (!(User_id && Cart_id && Default_address && OrderStatus && Default_payment_id)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const updatedOrder = await Order.findByIdAndUpdate({ _id: req.params.id }, {
        User_id,
        Cart_id,
        Default_address,
        OrderStatus,
        Default_payment_id,
        id: bookidgen("ID", 14522, 199585),
      });
      if (!updatedOrder) {
        res.send('Unable to add payment');
      }
      res.send(updatedOrder);
    }
  } catch {

  }
}

//Delete api for order 
module.exports.DeleteOrder = async (req, res) => {
  try {
    const DeleteOrder = await Order.findOneAndDelete({ id: req.params.id });
    if (!DeleteOrder) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: " Oders is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};




















