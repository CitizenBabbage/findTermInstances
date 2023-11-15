"use strict";
/**
 * @remarks Finds requested terms (and equivalent pronouns) in a span of text.
 * Works by filtering out all terms but the ones requested.
 * @param text - the text to search
 * @param string - a string containing the comma separated terms to search for
 * @returns An array of the found terms.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pronounType = exports.findTermInstances = void 0;
function findTermInstances(text, terms) {
    let stringList = getWords(text);
    const termList = terms.replace(/\s/g, '').split(',').map(item => evaluationCase(item));
    return stringList.filter((term) => checkTerm(term, termList));
}
exports.findTermInstances = findTermInstances;
/**
 * @remarks Takes a span of text and returns a same-ordered array of the words, including hyphenated.
 * Written as distinct function to handle the null case.
 * @param text - the text to transform
 * @returns An array of the found terms, empty array if none.
 */
function getWords(text) {
    const words = text.match(/\b[\w'-]+\b/g); // match(/\w+/g) is simpler, but doesn't catch hyphenated terms; 
    if (!words)
        return [];
    else
        return words;
}
/**
 * @remarks Takes a string and an array of strings and returns true if the former is either
 * contained in the latter or has the same person and number as a pronoun that is. Else false.
 * @param given - the string to check
 * @param targets - the array of terms and pronouns
 * @returns the appropriate boolean
 */
function checkTerm(given, targets) {
    if (targets.includes(evaluationCase(given)))
        return true;
    else if (pronounType(given) && targets.some(element => pronounType(given) === pronounType(element)))
        return true;
    else
        return false;
}
/**
 * @remarks Takes a term, makes it lower case (unless it's I), and then checks whether it's
 * on any of the pronoun lists.
 * @param term - the string to check
 * @returns either the name of the pronoun list containing the term or, if none, then nothing.
 */
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
/**
 * @remarks Reproduces functionality of .toLowerCase() for everything except 'I'
 * @param term - the string to transform
 * @returns the transformed string
 */
function evaluationCase(term) {
    if (term.toLowerCase() === 'i')
        return term; // leave upper or lower case i as it is
    else
        return term.toLowerCase();
}
