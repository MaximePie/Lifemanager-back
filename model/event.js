const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = Schema({
  event: {type: String, required: true},
  participants: {type: String, required: true},
  details: {type: String},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
