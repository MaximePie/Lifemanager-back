require('dotenv').config();
const cors = require('cors');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require('mongoose');
const {url} = require('./database/databaseService');
const bodyParser = require("body-parser");
const updateTasks = require('./crons/tasks');


const port = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
module.exports.io = io;

mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));



io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Disconnected")
  });
});

server.listen(port, () => {
  const CronJob = require('cron').CronJob;
  const job = new CronJob(
    '0 1 * * *',
    updateTasks,
    null,
    true,
    'America/Los_Angeles'
  );
  console.log("Running cron ");
  console.log(job);
  console.log(`Listening on port ${port}`)
});



// Importing Routes
const routes = require('./routes/routes');
app.use('/', routes);
