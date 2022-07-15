const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const cors = require('cors');
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());
app.use(express.json());


// 
const PORT=process.env.PORT || 5000
const DB_URI=process.env.DB_URI



app.use('/', require('./routes/router'));



const Main = async () => {
  try {
    await mongoose.connect(DB_URI);


    app.listen(PORT, async () => {

      console.log(`server started ON ${PORT}`)
    });
  } catch (error) {
    console.log(error);
  }
};

//file upload

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload1 = multer({ storage: storage }).single("user_file");
app.post("/upload", (req, res) => {
  console.log(req.data)
  upload1(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

Main();

