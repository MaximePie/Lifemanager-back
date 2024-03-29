const moment = require('moment');
const Task = require("../model/task");


async function updateTasks (request, response) {
  const tasks = await Task.find({isRepetitive: true})
  tasks.map((task) => {
    const {lastTimeDone, repetitionDelay} = task;
    const nextDutyTime = moment(lastTimeDone).add(repetitionDelay, 'd');
    if (moment().isSameOrAfter(nextDutyTime, "h")) {
      task.isOK = false;
      task.save();
    }
  })
}

module.exports = updateTasks;