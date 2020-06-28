const moment = require('moment');

function produceSchedule(today,endDate,subtasks) {    
    const schedule = [];
    while (moment(today).isBefore(endDate)) {  
        let taskToDo = getTodaysTask(subtasks, today);
        if (taskToDo) {
            schedule.push({ date: today, task: taskToDo.text })
            let updatedSubtask = updateCompletedPractice(taskToDo,today);
            let updatedSubtasks = subtasks.filter(task => task.text !== taskToDo.text);
            subtasks = [...updatedSubtasks,updatedSubtask];
        }
        else schedule.push({ date: today, task: "no task" });
        today = moment(today).add(1, "days").format("YYYY-MM-DD");
    }
    return schedule;
}


function updateCompletedPractice(originalSubtask,today) {
    const subtask = Object.assign({},originalSubtask)
    let nextGap = subtask.lastGap0 + subtask.lastGap1;
    subtask.nextDate = moment(today).add(nextGap, "days").format("YYYY-MM-DD");
    subtask.lastGap0 = subtask.lastGap1;
    subtask.lastGap1 = nextGap;
    return subtask;
}

function getTodaysTask(subtasks, today) {
    let tomorrow = moment(today).add(1, "days").format("YYYY-MM-DD");
    // find tasks that need to be practiced
    let todayTasks = subtasks.filter(task => moment(task.nextDate,"YYYY-MM-DD").isBefore(tomorrow));
    // if there are none, start a new task
    if (todayTasks.length === 0) {
        startNewTask = subtasks.find(task => !task.started);
        // if there are no practices at all
        if (!startNewTask) { return }
        else {
            startNewTask.nextDate = today;
            startNewTask.lastGap0 = 0;
            startNewTask.lastGap1 = 1;
            startNewTask.started = true;
            return startNewTask;
        }
    }
    return lowestGap(todayTasks);
}

function lowestGap(taskArray) {
    if (taskArray) return taskArray.reduce((bestTask, task) => {
        if (bestTask.lastGap0 + bestTask.lastGap1 > task.lastGap0 + task.lastGap1) { return task }
        else return bestTask
    }, { lastGap0: Infinity, lastGap1: Infinity });
}

module.exports = {
    produceSchedule,
    updateCompletedPractice,
    getTodaysTask,
    lowestGap
  };