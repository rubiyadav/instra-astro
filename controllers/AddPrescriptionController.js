const myPrescrption = require('../models/Prescription')

module.exports.addPrescription = async (req,res) =>{
	const prescrption = req.files

  try{
                    const prescrption = prescrption.forEach(async (element) => {
      const  myPrescrption = await myPrescrption.create({
        img: element.filename,
        user:req.user
      });
  	res.status(201).json({
  		message:"SuccessFully Added"
  	})
})

  }catch(error){
  	res.status(500).json({
  		message:error.message
  	})
  }
}


module.exports.getPrescrption = async (req,res) =>{
	try{
		const getPrescrption = await myPrescrption.find({user:req.user})
		.populate('user')
	
		res.status(200).json({
			data:getPrescrption
		})

	}catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}




module.exports.getallPrescrption = async (req, res) => {
                  try {
                  const getPrescrption = await myPrescrption.find({})
                  .populate('user')
                  res.status(200).json({
                                    data:getPrescrption
		})
	}catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}