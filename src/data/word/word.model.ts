import {WordDefinitionModel} from '../word-definition';

export interface WordModel {
  wordId: number;
  word: string;
  definitions: WordDefinitionModel[];
}
