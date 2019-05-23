const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const dbUri = 'mongodb+srv://eligarlo:' + process.env.MONGO_ATLAS_PW + '@test-learning-9adnk.mongodb.net/shopping-online?retryWrites=true';

mongoose.connect(dbUri, {useCreateIndex: true, useNewUrlParser: true})
.then(() => {
  console.log('Connected to the database!');
})
.catch(() => {
  console.log('Connection to the database failed!');
});
app.use('/api/user', userRoutes); // Will only use userRoutes if the req is for any of the routes starting on '/api/user'


app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});
