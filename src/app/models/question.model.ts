export class Question {
    id?: any;
    text?: string;
    type?: string;
    answers?: { id?: any, text?: string | undefined, count?: number | undefined, questionId?: any}[];
    surveyId?: any;
    mostCommon?: string;
    leastCommon?: string;
    hint?: string;
}