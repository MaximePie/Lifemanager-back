const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = Schema({
  name: {type: String, required: true},
  isOK: {type: Boolean},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
