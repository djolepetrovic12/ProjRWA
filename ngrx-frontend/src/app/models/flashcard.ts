

export interface Flashcard
{
    id:number;
    content:string;
    explanation:string;
    type: FCTypes.General | FCTypes.Word | FCTypes.Phrase | FCTypes.Sentence
}

export enum FCTypes {
    Word = 'word',
    Sentence = 'sentence',
    Phrase = 'phrase',
    General = 'general'
}
