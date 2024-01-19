import {MediaModel} from '../media';

export interface WordExample {
  wordExampleId: number;
  example: string;
  definitionId: number;
  images: MediaModel[];
}
