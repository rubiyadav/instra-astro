const {model,Schema } = require('mongoose');

const notifactionSchema = new Schema(
   {

	  user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

	notifaction:{
		type:String,
		
	},
	product:{
		type:[Schema.Types.ObjectId],
		ref:"Product"
	}

},
{
	timestump:true
})

module.exports = model("notifaction",notifactionSchema) 