const blog = require('../models/blog')

//post for blog user

module.exports.postuserBlogs = async (req, res) => {
  let photo = req.body
  photo['blog_Images'] = [req.file.originalname]
  let { Date, User_Name, sub_Title, Intro, blog_Images } = photo;

  try {
    if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await blog.create({
        User_Name,
        Date,
        sub_Title,
        Intro,
        blog_Images
      });

      if (!getResponce) {
        res.status(400).json({ message: "User Blogs  is not created", status: false });
      } else {
        res.status(200).json({
          message: "User Bloges is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//update blog for user

module.exports.UpdateBlogs = async (req, res) => {
  let photo = req.body
  photo['blog_Images'] = req.file.originalname
  let { Date, User_Name, sub_Title, Intro, blog_Images
  } = req.body;

  try {
    if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const updatedBlogs = await blog.findByIdAndUpdate({ _id: req.params.id }, {
        User_Name,
        Date,
        sub_Title,
        Intro,
        blog_Images
      });
      if (!updatedBlogs) {
        res.send('Unable to update Blogs');
      }
      res.send(updatedBlogs);
    }
  } catch {

  }
}

//
module.exports.GetByFind = async (req, res) => {
  try {
    const getSupportDetails = await blog .find({});
    if (!getSupportDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "blogs is Created successfully",
        data: getSupportDetails,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


module.exports.RemovedBlogs = async (req, res) => {
  try {
    const deleteBlogs = await blog.findOneAndDelete({ id: req.params.id });
    if (!deleteBlogs) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({ message: " Blogs is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};
