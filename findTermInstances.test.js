"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findTermInstances_1 = require("./findTermInstances");
describe('findTermInstances', () => {
    it('finds single term without pronouns', () => {
        expect((0, findTermInstances_1.findTermInstances)("The Customer is always right", "Customer")).toEqual(["Customer"]);
    });
    it('finds multiple terms without pronouns', () => {
        expect((0, findTermInstances_1.findTermInstances)("The Customer is not our client", "Customer, us")).toEqual(["Customer", "our"]);
    });
    it('finds single pronoun with multiple instances', () => {
        expect((0, findTermInstances_1.findTermInstances)("You must ensure that your fees are not high", "you")).toEqual(["You", "your"]);
    });
    it('finds terms with case sensitivity for "I"', () => {
        expect((0, findTermInstances_1.findTermInstances)("I am here, but they ignored me", "I, me")).toEqual(["I", "me"]);
    });
    it('finds terms with pronouns', () => {
        const result = (0, findTermInstances_1.findTermInstances)("My rights cannot be abridged by myself, only the Client", "I, Client");
        console.log(`result is ${JSON.stringify(result)}`);
        expect((0, findTermInstances_1.findTermInstances)("My rights cannot be abridged by myself, only the Client", "I, Client")).toEqual(["My", "myself", "Client"]);
    });
    it('handles case insensitivity except for "I"', () => {
        expect((0, findTermInstances_1.findTermInstances)("You should see your results", "you")).toEqual(["You", "your"]);
    });
    it('returns empty array when no terms are found', () => {
        expect((0, findTermInstances_1.findTermInstances)("There are no matching terms here", "Customer, us")).toEqual([]);
    });
    it('finds terms when they are pronouns', () => {
        expect((0, findTermInstances_1.findTermInstances)("You must ensure that your fees are not high", "you")).toEqual(["You", "your"]);
    });
    it('finds terms when case sensitivity is required', () => {
        expect((0, findTermInstances_1.findTermInstances)("i) In this clause my documents are read", "Me")).toEqual(["my"]);
    });
    // Add more tests as needed to cover all scenarios and edge cases
});
