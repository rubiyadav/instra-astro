const { model, Schema } = require("mongoose");
const productSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },

        country_origin: {
            type: String,
            required: true,
        },
        disclaimer: {
            type: String,
            required: true,
        },


        price: {
            type: String,
            required: true,
        },

        productPictures: [
            { img: { type: String } }
        ],
        CategoryID: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
    },
    { timestamps: true }
);
module.exports = model('product', productSchema)
