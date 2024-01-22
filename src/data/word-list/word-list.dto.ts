export interface CreateWordListDto {
  name: string;
}

export interface ToggleDefinitionToWordList {
  wordListId: number;
  definitionId: number;
  actionType: 'attach' | 'detach';
}
