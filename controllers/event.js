const Event = require('../model/event');
const server = require('../server');
const io = server.io;

module.exports.create = async function (request, response) {
  const {participants, event, details} = request.body;
  await Event.create({
    participants,
    event,
    details,
  });
  io.emit("events list updated");
  return response.json("Created!");
};


/**
 * Fetch all products and send it back
 * @param request
 * @param response
 */
module.exports.index = async function(request, response) {
  const events = await Event.find({}).sort({_id: -1});
  return response.json(events);
};


module.exports.delete = async function (request, response) {
  const {_id} = request.body;
  await Event.findByIdAndDelete(_id);
  io.emit("events list updated");
  return response.json("Deleted!");
};

module.exports.update = async function (request, response) {
  const {_id, event} = request.body;
  const updatedEvent = await Event.findByIdAndUpdate(_id, event);
  await updatedEvent.save();
  io.emit("events list updated");
  return response.json("Updated !");
};

