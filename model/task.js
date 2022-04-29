const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = Schema({
  name: {type: String, required: true},
  isOK: {type: Boolean},
  isRepetitive: {type: Boolean, default: false},
  repetitionDelay: {type: Number} /* In seconds*/,
  lastTimeDone: {type: Date, default: Date.now()}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

