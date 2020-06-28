const moment = require('moment');

let subtasks = [
    { text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true },
    { text: "b", nextDate: null, lastGap0: null, lastGap1: null, started: false },
    { text: "c", nextDate: null, lastGap0: null, lastGap1: null, started: false }
];

let today = "2020-06-27";

function produceSchedule(today,endDate,subtasks) {    
    const schedule = [];
    while (moment(today).isBefore(endDate)) {
        let taskToDo = getTodaysTask(subtasks, today);
        schedule.push({ date: today, task: taskToDo.text });
        console.log({ date: today, task: taskToDo.text })
        updateCompletedPractice(taskToDo);
    
        today = moment(today).add(1, "days").format("YYYY-MM-DD");
    }
    return schedule;
}


function updateCompletedPractice(subtask) {
    let nextGap = subtask.lastGap0 + subtask.lastGap1;
    subtask.nextDate = moment(subtask.nextDate).add(nextGap, "days").format("YYYY-MM-DD");
    subtask.lastGap0 = subtask.lastGap1;
    subtask.lastGap1 = nextGap;
}

function getTodaysTask(subtasks, today) {
    let tomorrow = moment(today).add(1, "days").format("YYYY-MM-DD");
    // find tasks that need to be practiced
    let todayTasks = subtasks.filter(task => moment(task.nextDate).isBefore(tomorrow));
    // if there are none, start a new task
    if (todayTasks.length === 0) {
        startNewTask = subtasks.find(task => !task.started);
        // if there are no practices at all
        if (!startNewTask) { console.log("Great job, have a day off") }
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
    return taskArray.reduce((bestTask, task) => {
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