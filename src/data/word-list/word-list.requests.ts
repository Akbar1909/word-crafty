import {request} from '../../services/request';
import {CreateWordListDto, ToggleDefinitionToWordList} from './word-list.dto';

export const createWordList = async (data: CreateWordListDto) =>
  await request.post('/word-list', data);

export const getWordLists = async () => {
  return await request.get('/word-list');
};

export const toggleDefinitionToWordList = async (
  dto: ToggleDefinitionToWordList,
) => {
  return await request.post('/word-list/toggle', dto);
};
