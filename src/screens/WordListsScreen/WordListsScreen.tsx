import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useCallback} from 'react';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import useGetWordLists from '../../hooks/api/useGetWordLists';
import {FlatList} from 'react-native-gesture-handler';
import {WordListModel} from '../../data/word-list';
import WordListCard from '../../components/WordListCard';

export default function WordListsScreen({route}: any) {
  const {type} = route.params;
  const {width: WIDTH} = useWindowDimensions();
  const {mineWordLists, processWordLists, topicBasedWordLists} =
    useGetWordLists();

  const renderItem = useCallback(({item}: {item: WordListModel}) => {
    return (
      <View style={tw`flex-1 flex items-center p-2 justify-center `}>
        <WordListCard {...item} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <FlatList
        contentContainerStyle={tw`flex justify-center`}
        data={mineWordLists}
        keyExtractor={item => String(item?.wordListId)}
        renderItem={renderItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
