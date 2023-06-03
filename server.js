require('dotenv').config();
const cors = require('cors');
const express = require("express");
const http = require("http");
const mongoose = require('mongoose');
const {url} = require('./database/databaseService');
const bodyParser = require("body-parser");
const updateTasks = require('./crons/tasks');
const routes = require('./routes/routes');


const port = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));
// Importing Routes
app.use('/', routes);
app.listen(port, () => console.log(`Listening on port ${port}`));
