const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/user');
const blogRoutes = require('./Routes/blog');
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// middlewares
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', blogRoutes);

mongoose
  .connect(
    "mongodb+srv://danish99223:danish11@cluster0.aszlrqv.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server is Running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
