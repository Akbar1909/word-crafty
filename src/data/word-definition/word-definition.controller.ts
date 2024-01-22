import {request} from '../../services/request';

export const getDefinitionsByWordListId = async ({
  wordListId,
}: {
  wordListId: number;
}) => await request.get('/definitions', {params: {wordListId}});
