const request = require('request');

module.exports.astro = async (req, res) => {



    const {sign} = req.query



    var options = {
        url: `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
        method: 'POST'
        };
        
        function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200).json(JSON.parse(body) )
        }
        
          res.status(400).json({message:"no data found"})
        }
        
      request(options, callback);
    
   

  }