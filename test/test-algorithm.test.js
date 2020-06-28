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