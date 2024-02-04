import React, {useCallback, useMemo, forwardRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import useGetWordLists from '../../hooks/api/useGetWordLists';
import WordListCard from '../../components/WordListCard';
import tw from 'twrnc';
import {WordListModel, toggleDefinitionToWordList} from '../../data/word-list';

interface ChooseWordListBottomSheetProps {
  definitionId: number;
}

const ChooseWordListBottomSheet = forwardRef(
  ({definitionId}: ChooseWordListBottomSheetProps, ref: any) => {
    // ref

    const queryClient = useQueryClient();
    const [pressedId, setPressedId] = useState<number | null>(null);

    const {mineWordLists} = useGetWordLists();

    const {mutate, isPending} = useMutation({
      mutationFn: toggleDefinitionToWordList,
      mutationKey: ['save'],
      onSuccess: response => {
        queryClient.invalidateQueries({
          queryKey: ['word-list-words', {wordListId: pressedId}],
        });
        ref.current?.close();
      },
      onError: error => {},
    });

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    const handleDefinitionToWordList = useCallback(
      (wordListId: WordListModel['wordListId']) => {
        setPressedId(wordListId);
        mutate({definitionId, wordListId, actionType: 'attach'});
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [definitionId],
    );

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {}, []);

    const renderItem = useCallback(
      ({item}: {item: WordListModel}) => (
        <View style={tw`flex-1 flex items-center p-2`}>
          <WordListCard
            isSaving={isPending && item.wordListId === pressedId}
            handlePress={handleDefinitionToWordList}
            {...item}
          />
        </View>
      ),
      [handleDefinitionToWordList, isPending, pressedId],
    );

    // renders
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}>
        <>
          <Text style={tw`text-xl font-medium`}>Choose a word list</Text>
          <BottomSheetFlatList
            data={mineWordLists}
            keyExtractor={item => String(item.wordListId)}
            renderItem={renderItem}
            numColumns={3}
          />
        </>
      </BottomSheetModal>
    );
  },
);

export default ChooseWordListBottomSheet;
