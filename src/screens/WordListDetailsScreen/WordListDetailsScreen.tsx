import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {FlatList} from 'react-native-gesture-handler';
import DefinitionCard from '../../components/DefinitionCard';
import useGetWordsByWordListId from '../../hooks/api/useGetWordsByWordListId';
import {WordDefinitionModel} from '../../data/word-definition';
import tw from 'twrnc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MyModal from '../../components/MyModal';
import ConfirmationModalContent from '../../components/ConfirmationModalContent';
import {toggleDefinitionToWordList} from '../../data/word-list';
import {useRefreshOnFocus} from '../../hooks/helpers/useRefreshOnFocus';
import {SECONDARY_COLORS} from '../../theme/colors';

const WordListDetailsScreen = ({route}: any) => {
  const {wordListId, wordListTitle} = route.params;
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  const [actionType, setActionType] = useState<'delete' | 'idle'>('idle');
  const [pressedDefinitionId, setPressedDefinitionId] = useState<number | null>(
    null,
  );

  const listQueryKey: any = [
    'word-list-words',
    {wordListId: Number(wordListId)},
  ];

  const {array, refetch} = useGetWordsByWordListId(Number(wordListId));

  useRefreshOnFocus(refetch);

  const {mutate, isPending} = useMutation({
    mutationFn: toggleDefinitionToWordList,
    mutationKey: ['detach'],

    onSuccess: () => {
      queryClient.setQueryData(listQueryKey, {
        data: {
          list: array.filter(item => item.definitionId !== pressedDefinitionId),
        },
      });
      setActionType('idle');
      setPressedDefinitionId(null);
    },
  });

  const handleDeletePress = (definitionId: number) => {
    setActionType('delete');
    setPressedDefinitionId(definitionId);
  };

  const handleDeleteNo = useCallback(() => {
    setActionType('idle');
    setPressedDefinitionId(null);
  }, []);

  const handleDeleteOk = useCallback(() => {
    mutate({
      definitionId: pressedDefinitionId as number,
      wordListId,
      actionType: 'detach',
    });
  }, [mutate, pressedDefinitionId, wordListId]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 p-2`}>
      <View style={tw`flex items-center justify-center mb-4`}>
        <Text style={tw`text-3xl font-semibold`}>{wordListTitle}</Text>
      </View>

      <View style={tw`flex flex-row items-center justify-center mb-4 gap-3`}>
        <View>
          <MaterialIcons
            onPress={() => {
              // @ts-ignore
              navigate('GameListScreen', {
                listQueryKey,
              });
            }}
            name="quiz"
            size={32}
            color={SECONDARY_COLORS.main}
          />
        </View>
        <View>
          <MaterialIcons name="sort-by-alpha" size={32} />
        </View>
        <View>
          <FontAwesome name="trash-o" size={32} />
        </View>
      </View>

      <View style={tw`flex-1`}>
        <FlatList
          data={array}
          keyExtractor={item => String(item.definitionId)}
          renderItem={({
            item,
          }: {
            item: WordDefinitionModel & {word: string; wordId: number};
          }) => (
            <DefinitionCard handleDeletePress={handleDeletePress} {...item} />
          )}
        />
      </View>
      <MyModal handleClose={handleDeleteNo} isVisible={actionType === 'delete'}>
        <ConfirmationModalContent
          handleNo={handleDeleteNo}
          handleOk={handleDeleteOk}
          isPending={isPending}
          renderContent={
            <View style={tw`flex items-center justify-center`}>
              <Text style={tw`text-xl font-bold`}>Delete a word</Text>
              <Text style={tw`text-center `}>
                Are you sure you want to delete this meaning
              </Text>
            </View>
          }
        />
      </MyModal>
    </SafeAreaView>
  );
};

export default WordListDetailsScreen;

const styles = StyleSheet.create({});
