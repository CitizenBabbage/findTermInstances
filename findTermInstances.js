"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pronounType = exports.findTermInstances = void 0;
function findTermInstances(text, terms) {
    let stringList = getWords(text);
    const termList = terms.replace(/\s/g, '').split(',').map(item => evaluationCase(item));
    return stringList.filter((term) => checkTerm(term, termList));
}
exports.findTermInstances = findTermInstances;
function getWords(text) {
    const words = text.match(/\b[\w'-]+\b/g); // match(/\w+/g) is simpler, but doesn't catch hyphenated terms; 
    if (!words)
        return [];
    else
        return words;
}
function checkTerm(given, targets) {
    // console.log(`checking given ${JSON.stringify(given)} against target list ${targets}`)
    // console.log(`pronounType of ${given} is ${pronounType(given)}`)
    // console.log(`pronounType of ${targets} are ${targets.map(item => pronounType(item))}`)
    if (targets.includes(evaluationCase(given))) {
        // console.log(`${given} matches ${targets} exactly`)
        return true;
    }
    else if (pronounType(given) && targets.some(element => pronounType(given) === pronounType(element))) {
        // console.log(`pronounType of given ${given} is ${pronounType(given)}, which matches the pronoun type of some element in ${targets}`)
        return true;
    }
    else
        return false;
}
function pronounType(term) {
    term = evaluationCase(term);
    const fps = ['I', 'me', 'my', 'mine', 'myself'];
    const fpp = ['we', 'us', 'our', 'ours', 'ourselves'];
    const sps = ['you', 'your', 'yours', 'yourself'];
    if (fps.includes(term))
        return 'fps';
    else if (fpp.includes(term))
        return 'fpp';
    else if (sps.includes(term))
        return 'sps';
}
exports.pronounType = pronounType;
function evaluationCase(term) {
    if (term.toLowerCase() === 'i')
        return term; // leave upper or lower case i as it is
    else
        return term.toLowerCase();
}
// const result = findTermInstances("My rights cannot be abridged by myself, only the Client", "I, Client")
// console.log(`result is ${JSON.stringify(result)}`)
