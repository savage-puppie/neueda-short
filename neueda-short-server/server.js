const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load config
require('dotenv').config();

app.use(bodyParser.json());

require('./src/models');

// Allow CORS from any source
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

    return res.status(200).json({});
  }

  next();
});

require('./src/routes')(app);

// Connects to the databse
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  { keepAlive: true, reconnectTries: Number.MAX_VALUE, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.error('Error while connecting to database');

      return false;
    }
  }
);

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}`));
