const Task = require('../model/task');
const server = require('../server');
const io = server.io;

module.exports.create = async function (request, response) {
  const {name} = request.body;
  await Task.create({
    name,
    isOK: false,
  });
  io.emit("tasks list updated");
  return response.json("Created!");
};

/**
 * Fetch all products and send it back
 * @param request
 * @param response
 */
module.exports.index = async function(request, response) {
  const tasks = await Task.find({}).sort({_id: -1});
  return response.json(tasks);
};



module.exports.delete = async function (request, response) {
  const {_id} = request.body;
  await Task.findByIdAndDelete(_id);
  io.emit("tasks list updated");
  return response.json("Deleted!");
};

module.exports.updateCheckStatus = async function (request, response) {
  const {_id, isOK} = request.body;
  const task = await Task.findById(_id);
  task.isOK = isOK;
  await task.save();
  io.emit("tasks list updated");
  return response.json("Checked!");
};