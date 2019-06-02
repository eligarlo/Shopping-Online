const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const app = express();

const dbUri = 'mongodb+srv://eligarlo:' + process.env.MONGO_ATLAS_PW + '@test-learning-9adnk.mongodb.net/shopping-online?retryWrites=true';

// Routes
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

app.use(bodyParser.json());
app.use(cors());

// Connection to db
mongoose.connect(dbUri, {useCreateIndex: true, useNewUrlParser: true})

.then(() => {
  console.log('Connected to the database!');
})
.catch(() => {
  console.log('Connection to the database failed!');
});

app.use('/productImages', express.static(path.join('./upload'))); // Path for the uploaded products image.
app.use('/api/user', userRoutes); // Will only use userRoutes if the req is for any of the routes starting on '/api/user'
app.use('/api/category', categoryRoutes); // Will only use categoryRoutes if the req is for any of the routes starting on '/api/category'
app.use('/api/product', productRoutes); // Will only use productRoutes if the req is for any of the routes starting on '/api/product'

module.exports = app;
