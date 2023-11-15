# findTermInstances
This is my response to a coding challenge sent to me as part of an interview process with Lexical Labs. It is written in Typescript. 

It includes a function `findTermInstances` which finds requested terms (and equivalent pronouns) in a span of text. "Equivalent pronouns", in this context, are pronouns with the same person and number. E.g. "I" is equivalent to "me", to "my", to "mine" etc, because they are all first person singular.  

The findTermInstances function takes two parameters: a string of text and a comma-separated string containing terms to search for. It returns the found terms (and equivalent pronouns) as an array.

E.g. 


`findTermInstances("You must ensure that your fees are not high", "you") => ["You", "your"])`


`findTermInstances("The Customer is not our client", "Customer, client")) => ["Customer", "client"]`


Broadly speaking, the function works by filtering out all terms but the ones requested, returning an array of the found terms. 

It is generally case insensitive. However it distinguishes between lower and upper case 'i'. 



### Prerequisites

- Node.js
- npm (Node Package Manager)
- jest (if you're planning to run the included tests) 

### Installing
At the command line: 

`git clone https://github.com/CitizenBabbage/findTermInstances`

Navigate to the project directory and install the dependencies:

`npm install`

The project uses TypeScript, which needs to be compiled to JavaScript. To build the project, run:

`npm run build`

or...

`npx tsc`

### Running the Project
After building the project, you can run the compiled JavaScript using Node.js:

`node findTermInstances.js`

(Though this won't do anything interesting unless you add a call to the main function to the file.) 

### Running the Tests
The project includes 29 unit tests for the findTermInstances function, using Jest. To run the tests, execute:

`npm test`

### Known Issues / Limitations
It does not distinguish between the first person pronoun and the first Roman numeral. 
It does not detect when a pronoun is part of a multi-term name. E.g. in "Mr Asimov retains all rights to the IP 'I Robot'", it will return the "I" in "I Robot" as an instance of the first person singular. 

Authors
Bernard Molyneux
