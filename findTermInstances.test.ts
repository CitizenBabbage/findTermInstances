import {findTermInstances} from './findTermInstances'



  describe('findTermInstances', () => {

    it('finds single term without pronouns', () => {
        expect(findTermInstances("The Customer is always right", "Customer")).toEqual(["Customer"]);
    });

    it('finds multiple terms without pronouns', () => {
        expect(findTermInstances("The Customer is not our client", "Customer, client")).toEqual(["Customer", "client"]);
    });

    it('finds single pronoun with single instance', () => {
        expect(findTermInstances("You must ensure that fees are not prohibitively expensive", "you")).toEqual(["You"]);
    });

    it('finds single pronoun with multiple instances', () => {
        expect(findTermInstances("You must ensure that your fees are not high", "you")).toEqual(["You", "your"]);
    });

    it('finds first person pronoun when capitalised', () => {
        expect(findTermInstances("I am here, but you are not", "I")).toEqual(["I"]);
    });

    it('finds multiple first person pronouns when request is capitalised', () => {
        expect(findTermInstances("I am here, but they ignored me", "I")).toEqual(["I", "me"]);
    });

    it('ignores first person pronouns when request is not capitalised', () => {
        expect(findTermInstances("I am here, but they ignored me", "i")).toEqual([]);
    });

    it('works when pronouns and ordinary terms are combined', () => {
        expect(findTermInstances("My rights cannot be abridged by myself, only the Client", "I, Client")).toEqual(["My", "myself", "Client"]);
    });

    it('handles case insensitivity for second person', () => {
        expect(findTermInstances("You should see your results", "you")).toEqual(["You", "your"]);
        expect(findTermInstances("You must ensure that your fees are not high", "you")).toEqual(["You", "your"]);
    });

    it('returns empty array when no terms are found', () => {
        expect(findTermInstances("There are no matching terms here", "Customer, us")).toEqual([]);
    });

    it('does not return legal document notations when first person pronoun is requested', () => {
        expect(findTermInstances("i) In this clause my documents are read", "Me")).toEqual(["my"]);
        expect(findTermInstances("Clauses i), ii), i., ii. and i are important, as is clause ii", "I")).toEqual([]);
        expect(findTermInstances("(i) This clause is crucial", "I")).toEqual([]);
    });

    it('does not return first person pronoun when lower case i is requested', () => {
        expect(findTermInstances("i) In this clause my documents are read", "i")).toEqual(["i"]);
        expect(findTermInstances("Clauses i), ii), i., ii. and i are important, as is clause ii", "i")).toEqual(["i", "i", "i"]);
        expect(findTermInstances("(i) This clause is crucial", "i")).toEqual(["i"]);
    });

    it('returns empty array for empty text or terms', () => {
        expect(findTermInstances("", "Customer")).toEqual([]);
        expect(findTermInstances("Some text here", "")).toEqual([]);
        expect(findTermInstances("", "")).toEqual([]);
    });

    it('handles longer spans of text with multiple sentences', () => {
        const longText = `We agree that the Secretary of the Department of Health shall submit a bi-annual monitoring
        report of the implementation of this Act [titled the Universally Accessible Cheaper and Quality
        Medicines Act] to the President. We agree that this report shall be published in a newspaper of general
        circulation within 30 days of submission. We further agree that within the same 30 days and for a period lasting at least one year the report shall also be hosted and made available on the Department of Health's website.`;
        expect(findTermInstances(longText, "Secretary, our, You, Department")).toEqual(["We", "Secretary", "Department", "We", "We", "Department"]);
    });

    it('finds hypenated terms', () => {
        expect(findTermInstances(`Sec. 30 requires the Secretary of the Department of Health to submit a bi-annual monitoring
        report`, "bi-annual")).toEqual(["bi-annual"]);
    });

    it('does not find the same pronouns more than once for redundant requests', () => {
        expect(findTermInstances("You should respect your boundaries", "you, your, You")).toEqual(["You", "your"]);
    });

    it('counts by tokens not types', () => {
        expect(findTermInstances("The Client should know that the Client is in violation", "client")).toEqual(["Client", "Client"]);
    });

    it('handles cases where the same term is requested with different capitalization', () => {
        expect(findTermInstances("The Client and the client are different", "client, Client")).toEqual(["Client", "client"]);
    });

    it('does not extract pronouns that are hypenated parts of other words', () => {
        expect(findTermInstances("Mr Asimov reserves all rights pertaining to I-Robot and any derivatives including but not limited to books, films and merchandise", "I")).toEqual([]);
        expect(findTermInstances("The following document pertains to all matters regarding the bankruptcy of the company We-Work.", "We")).toEqual([]);
    });

    it('correctly identifies terms adjacent to punctuation or special characters', () => {
        expect(findTermInstances("Is this your book? 'Yes, it's mine,' she replied.", "your, mine")).toEqual(["your", "mine"]);
    });

});