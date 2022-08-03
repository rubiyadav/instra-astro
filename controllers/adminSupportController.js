
const Support = require('../models/support')

module.exports.UserSettings = async (req, res) => {
    let { UserId, Phone,Email ,WhatApp,zipcode} = req.body;

    try {
        if (!(UserId && Phone && Email && WhatApp && zipcode)) {
            res.json({ message: "All fields are required", status: false });
        } else {

            const SupportUser = await Support .findOne({ UserId });
            if (! SupportUser) {
                const NewUserSupport = await Support.create({ UserId, Phone,Email ,WhatApp,zipcode});
                              if (NewUserSupport) res.status(200).json({ message: "Customer Details is created Successfully ", data: NewUserSupport, status: true, });
                res.status(400).json({ message: " Customer Details not Updated", status: false });
            } else {
                  const UpdateUserSupport = await Support.findOneAndUpdate({ UserId }, { Phone},{Email},{WhatApp},{zipcode});
                if (UpdateUserSupport) res.status(200).json({ message: "Customer Detailsis Is  Updated", data: UpdateUserSetting, status: true, });
                res.status(400).json({ message: "Usersetting  not Updated", status: false });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};
