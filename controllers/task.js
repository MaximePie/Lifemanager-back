const Task = require('../model/task');
const server = require('../server');
const moment = require("moment");

module.exports.create = async function (request, response) {
  const {name, isRepetitive, delay} = request.body;
  await Task.create({
    name,
    isOK: false,
    isRepetitive,
    repetitionDelay: delay
  });
  return response.json("Created!");
};

/**
 * Fetch all products and send it back
 * @param request
 * @param response
 */
module.exports.index = async function(request, response) {
  const tasks = await Task.find({}).sort({_id: -1});
  console.log("C'est en route roh la la");
  return response.json(tasks);
};



module.exports.delete = async function (request, response) {
  const {_id} = request.body;
  await Task.findByIdAndDelete(_id);
  return response.json("Deleted!");
};

module.exports.updateCheckStatus = async function (request, response) {
  const {_id, isOK} = request.body;
  const task = await Task.findById(_id);
  task.isOK = isOK;
  if (isOK && task.isRepetitive) {
    task.lastTimeDone = moment();
  }
  await task.save();
  return response.json("Checked!");
};