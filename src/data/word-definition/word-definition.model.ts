import {WordExample} from '../word-example';

export interface WordDefinitionModel {
  definitionId: number;
  wordId: number;
  wordListId: number | null;
  definition: number;
  partOfSpeech: string;
  examples: WordExample[];
}
