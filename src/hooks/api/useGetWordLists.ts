import {useQuery} from '@tanstack/react-query';
import {WordListModel, getWordLists} from '../../data/word-list';
import {useEffect, useMemo} from 'react';
import {authMMKVStorage, wordListsMMKVStorage} from '../../store/mmkv/store';

const useGetWordLists = () => {
  const {data, ...rest} = useQuery({
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

  const topicBasedWordLists = data?.topicbased || [];
  const processWordLists = data?.process || [];
  const mineWordLists = data?.mine || [];

  return {
    topicBasedWordLists,
    processWordLists,
    mineWordLists,
    ...rest,
  };
};

export default useGetWordLists;
