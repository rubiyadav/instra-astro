const Support = require('../models/support')


module.exports.CustomerSupport = async (req, res) => {

  let {Phone ,Email , WhatApp, zipcode } = req.body;

  try {
    if (!(Phone && Email && WhatApp && zipcode)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await Support.create({
        Phone,
        Email,
        WhatApp,
        zipcode,
      });

      if (!getResponce) {
        res.status(400).json({ message: "Customer Support  Details  is not created", status: false });
      } else {
        res.status(200).json({
          message: "Customer Support  Details is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

module.exports.GetByFind = async (req, res) => {
  try {
    const getSupportDetails = await Support.find({});
    if (!getSupportDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "Customer Support Details is Created successfully",
        data: getSupportDetails,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



module.exports.ViewCustomerDSupportGetByID = async (req, res) => {
  try {
    const getwalletDetails= await Support.findOne({_id: req.params.id });
    if (!getwalletDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "Customer Support Details Created successfully",
        data: getwalletDetails,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



