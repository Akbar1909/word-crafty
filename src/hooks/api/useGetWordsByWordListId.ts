import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getDefinitionsByWordListId} from '../../data/word-definition/word-definition.controller';
import {WordDefinitionModel} from '../../data/word-definition';

const useGetWordsByWordListId = (wordListId: number) => {
  const {data, ...rest} = useQuery({
    queryFn: async () => await getDefinitionsByWordListId({wordListId}),
    queryKey: ['word-list-definitions', {wordListId}],
    select: response => response.data,
  });

  console.log(data);

  const preparedData: Map<
    number,
    WordDefinitionModel & {word: string; wordId: number}
  > = useMemo(
    () =>
      Array.isArray(data?.list)
        ? data.list.reduce((acc: any, cur: any) => {
            return acc.set(cur.definitionId, cur);
          }, new Map())
        : new Map(),
    [data],
  );

  console.log({preparedData});

  return {
    keyValue: preparedData,
    array: Array.from(preparedData.values()),
    ...rest,
  };
};

export default useGetWordsByWordListId;
