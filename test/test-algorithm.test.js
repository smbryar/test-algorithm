const {
    produceSchedule,
    updateCompletedPractice,
    getTodaysTask,
    lowestGap
} = require("../test-algorithm");

xdescribe("lowestGap", () => {
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

xdescribe("getTodaysTask", () => {
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