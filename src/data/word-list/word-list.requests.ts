import {request} from '../../services/request';
import {CreateWordListDto, ToggleDefinitionToWordList} from './word-list.dto';

export const createWordList = async (data: CreateWordListDto) =>
  await request.post('/word-list', data);

export const getWordLists = async () => {
  console.log('test');
  return await request.get('/word-list');
};

export const toggleDefinitionToWordList = async (
  dto: ToggleDefinitionToWordList,
) => {
  console.log(dto);
  return await request.post('/word-list/toggle', dto);
};
