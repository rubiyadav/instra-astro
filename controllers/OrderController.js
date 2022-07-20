const Order = require("../models/Order");
const OrderAdmin = require("../models/OrderAdmin");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Address = require("../models/Address");


  module.exports.addOrder = async (req, res) => {
      const getUser = await User.findById(req.user);
      const { _id } = getUser;
      const getAddress = await Address.findOne({ user: _id });
      const orderAdmin = await OrderAdmin.create({
        user: getUser._id,
        addressId: getAddress._id,
        totalAmount: req.body.totalAmount,
        items: req.body.items,
        paymentStatus: req.body.paymentStatus,
        paymentType: req.body.paymentType,
        orderStatus: req.body.orderStatus,
      });

      Cart.deleteOne({ user: getUser._id }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          req.body.user = getUser._id;
          req.body.orderStatus = [
            {
              type: "ordered",
              date: new Date(),
              isCompleted: true,
            },
            {
              type: "packed",
              isCompleted: false,
            },
            {
              type: "shipped",
              isCompleted: false,
            },
            {
              type: "delivered",
              isCompleted: false,
            },
          ];
          const order = Order.create({
            user: getUser._id,
            addressId: getAddress._id,
            totalAmount: req.body.totalAmount,
            items: req.body.items,
            paymentStatus: req.body.paymentStatus,
            paymentType: req.body.paymentType,
            orderStatus: req.body.orderStatus,
          });
          return res
            .status(201)
            .json({ msg: "Order placed successfully", order });
        }
      });
  }


  module.exports.previouslyBoughtItem = async  (req, res) => {
      const getUser = await User.findById(req.user);
      try {
        const getPreviousItem = await Order.find({ user: getUser._id })
      .populate("items.productId")
        res.status(201).json({ data: getPreviousItem });
      } catch (error) {
        res.status(400).json(error);
      }
};

  module.exports.recentlyOrdertItem = async  (req, res) => {
      const getUser = await User.findById(req.user);

      try {
        const getPreviousItem = await Order.findOne({ user: getUser._id });
        console.log(getPreviousItem);
        res.status(201).json({ data: getPreviousItem });
      } catch (error) {
        res.status(400).json(error);
    }
};

module.exports.viewActiveOrders = async (req, res) => {

      const getUser = await User.findById(req.user);
      const { _id } = getUser;
      const getProduct = await Order.find(_id, {
        orderStatus: {
          $elemMatch: {
            isCompleted: false,
          },
        },
      });
      res.status(200).json({ response: getProduct })
};

    module.exports.trackOrders = async (req, res) => {
      const getUser = await User.findById( req.user);
      const { _id } = getUser;
      const getProduct = await Order.find(_id, {
        orderStatus: {
          $elemMatch: {
            type: 1,
          },
        },
      });
      res.status(200).json({ response: getProduct });
};

module.exports.updateOrderAdmin = async (req, res) => {
  await OrderAdmin.updateOne(
    { _id: req.body.orderId },
    {
      orderStatus: req.body.type,
    }
  );
  await Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

module.exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "title")
    .exec();
  res.status(200).json({ orders });
};

module.exports.getCustomerOrdersAdmin = async (req, res) => {
  const orders = await OrderAdmin.find({})
    .populate("items.productId", "title")
    .exec();
  res.status(200).json({ orders });
};
