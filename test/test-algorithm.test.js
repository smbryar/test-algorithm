const {
    produceSchedule,
    updateCompletedPractice,
    getTodaysTask,
    lowestGap
} = require("../test-algorithm");

describe("lowestGap", () => {
    test("returns task if passed one task", () => {
        let taskArray = [{ text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true }];
        expect(lowestGap(taskArray)).toEqual({ text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true });
    });
    test("returns task with lowest gap", () => {
        let taskArray = [
            { text: "a", nextDate: "2020-06-27", lastGap0: 1, lastGap1: 1, started: true },
            { text: "b", nextDate: "2020-06-28", lastGap0: 0, lastGap1: 1, started: true }
        ];
        expect(lowestGap(taskArray)).toEqual({ text: "b", nextDate: "2020-06-28", lastGap0: 0, lastGap1: 1, started: true });
    });
    test("returns first task if passed tasks with equal gaps", () => {
        let taskArray = [
            { text: "a", nextDate: "2020-06-28", lastGap0: 1, lastGap1: 1, started: true },
            { text: "b", nextDate: "2020-06-27", lastGap0: 1, lastGap1: 1, started: true }
        ];
        expect(lowestGap(taskArray)).toEqual({ text: "a", nextDate: "2020-06-28", lastGap0: 1, lastGap1: 1, started: true });
    });
});

describe("getTodaysTask", () => {
    test("returns task if passed array including dates in past and tasks that have been started", () => {
        let today = "2020-06-27";
        let subtasks = [
            { text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true },
            { text: "b", nextDate: null, lastGap0: null, lastGap1: null, started: false }
        ];
        expect(getTodaysTask(subtasks,today)).toEqual({ text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true });
    });
    test("returns unstarted task if passed array including all unstarted", () => {
        let today = "2020-06-27";
        let subtasks = [
            { text: "a", nextDate: null, lastGap0: null, lastGap1: null, started: false },
            { text: "b", nextDate: null, lastGap0: null, lastGap1: null, started: false }
        ];
        expect(getTodaysTask(subtasks,today)).toEqual({ text: "a", nextDate: "2020-06-28", lastGap0: 0, lastGap1: 1, started: true });
    });
    test("returns \"No task\" if passed only started tasks in the future", () => {
        let today = "2020-06-27";
        let subtasks = [
            { text: "a", nextDate: "2020-06-30", lastGap0: 0, lastGap1: 1, started: true }
        ];
        expect(getTodaysTask(subtasks,today)).toEqual("No task");
    });
});

describe("updateCompletedPractice", () => {
    test("returns task with lastgaps of 0 and 1", () => {
        let subtask = { text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true };
        expect(updateCompletedPractice(subtask)).toEqual({ text: "a", nextDate: "2020-06-28", lastGap0: 1, lastGap1: 1, started: true });
    });
    test("returns task correctly when date goes into next month", () => {
        let subtask = { text: "a", nextDate: "2020-06-27", lastGap0: 3, lastGap1: 5, started: true };
        expect(updateCompletedPractice(subtask)).toEqual({ text: "a", nextDate: "2020-07-05", lastGap0: 5, lastGap1: 8, started: true });
    });
});

describe("produceSchedule", () => {
    test("Produce schedule of one day", () => {
        let today = "2020-06-27";
        let endDate = "2020-06-28"
        let subtasks = [
            { text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true },
            { text: "b", nextDate: null, lastGap0: null, lastGap1: null, started: false }
        ];
        let schedule = [{date:today,task:"a"}];
        expect(produceSchedule(today,endDate,subtasks)).toEqual(schedule);
    });
    test("Produce schedule of three days", () => {
        let today = "2020-06-27";
        let endDate = "2020-06-30"
        let subtasks = [
            { text: "a", nextDate: "2020-06-27", lastGap0: 0, lastGap1: 1, started: true },
            { text: "b", nextDate: null, lastGap0: null, lastGap1: null, started: false }
        ];
        let schedule = [
            {date:"2020-06-27",task:"a"},
            {date:"2020-06-28",task:"a"},
            {date:"2020-06-29",task:"b"}
        ];
        expect(produceSchedule(today,endDate,subtasks)).toEqual(schedule);
    });
});