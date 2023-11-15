

export function findTermInstances(text:string, terms:string):string[]{
    let stringList = getWords(text); 
    const termList = terms.replace(/\s/g, '').split(',').map(item => evaluationCase(item)); 
    return stringList.filter((term) => checkTerm(term,termList))
}

function getWords(text : string){
    const words : string[] | null = text.match(/\b[\w'-]+\b/g) // match(/\w+/g) is simpler, but doesn't catch hyphenated terms; 
    if (!words) return []; 
    else return words; 
}

function checkTerm(given : string, targets : string[]): boolean {
    // console.log(`checking given ${JSON.stringify(given)} against target list ${targets}`)
    // console.log(`pronounType of ${given} is ${pronounType(given)}`)
    // console.log(`pronounType of ${targets} are ${targets.map(item => pronounType(item))}`)

    if (targets.includes(evaluationCase(given))) 
        {
            // console.log(`${given} matches ${targets} exactly`)
            return true;
        }
    else if (pronounType(given) && targets.some(element => pronounType(given) === pronounType(element))) {
        // console.log(`pronounType of given ${given} is ${pronounType(given)}, which matches the pronoun type of some element in ${targets}`)
        return true;
    }
    else return false;    
} 



export function pronounType(term : string ) : string | void {
    term = evaluationCase(term); 
    const fps = ['I','me','my','mine','myself']
    const fpp = ['we','us','our','ours','ourselves']
    const sps = ['you','your','yours','yourself']
    if (fps.includes(term)) return 'fps'; 
    else if (fpp.includes(term)) return 'fpp'; 
    else if (sps.includes(term)) return 'sps'; 
}

function evaluationCase(term : string) : string{ 
    if (term.toLowerCase() === 'i' ) return term; // leave upper or lower case i as it is
    else return term.toLowerCase(); 
}

// const result = findTermInstances("My rights cannot be abridged by myself, only the Client", "I, Client")
// console.log(`result is ${JSON.stringify(result)}`)