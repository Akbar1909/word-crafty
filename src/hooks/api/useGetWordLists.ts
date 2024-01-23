import {useQuery} from '@tanstack/react-query';
import {WordListModel, getWordLists} from '../../data/word-list';
import {useEffect, useMemo} from 'react';
import {authMMKVStorage, wordListsMMKVStorage} from '../../store/mmkv/store';

const useGetWordLists = () => {
  const {data, isSuccess, ...rest} = useQuery({
    queryFn: getWordLists,
    queryKey: ['word-lists'],
    select: res => res.data,
    enabled: true,
    // @ts-ignore
    // initialData: {
    //   data: {
    //     data: {
    //       list:
    //         JSON.parse(
    //           wordListsMMKVStorage.getString('my-word-lists-0') || '',
    //         ) || [],
    //     },
    //   },
    // },
  });

  const preparedData: Map<number, WordListModel> = useMemo(
    () =>
      (
        (Array.isArray(data?.data?.list)
          ? data?.data?.list
          : []) as Array<WordListModel>
      ).reduce((acc, cur) => {
        return acc.set(cur.wordListId, cur);
      }, new Map()),
    [data],
  );

  useEffect(() => {
    if (isSuccess) {
      wordListsMMKVStorage.set(
        'my-word-lists-0',
        JSON.stringify(Array.from(preparedData.values())),
      );
      wordListsMMKVStorage.set('my-word-lists-set-0', true);
    }
  }, [preparedData, isSuccess]);

  return {
    keyValue: preparedData,
    array: Array.from(preparedData.values()),
    ...rest,
  };
};

export default useGetWordLists;
