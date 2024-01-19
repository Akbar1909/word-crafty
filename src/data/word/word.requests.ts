import {request} from '../../services/request';

export const searchWords = async (search: string) =>
  await request.get('/words/search', {params: {search}});

export const searchOneWord = async (id: number) =>
  await request.get(`/words/${id}`);
