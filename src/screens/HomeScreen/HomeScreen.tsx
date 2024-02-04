/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  // SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewAllWidget from '../../components/ViewAllWidget';
import MyTheme from '../../theme/colors';
import useGetWordLists from '../../hooks/api/useGetWordLists';
import WordListCard from '../../components/WordListCard';
import {WordListModel} from '../../data/word-list';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const {navigate} = useNavigation();
  const [search, setSearch] = useState('');

  const {topicBasedWordLists, processWordLists, mineWordLists} =
    useGetWordLists();

  const handlePress = (
    wordListId: WordListModel['wordListId'],
    wordListTitle: WordListModel['name'],
  ) => {
    // @ts-ignore
    navigate('WordListDetailsScreen', {
      wordListId,
      wordListTitle,
    });
  };

  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 4,
        }}>
        <View style={tw`mb-3`}>
          <Text style={tw`text-lg`}>Welcome</Text>
          <Text style={tw`text-4xl font-bold`}>Akbar{'\n'}Bobomurodov</Text>
        </View>

        <View style={tw`mb-6`}>
          <ViewAllWidget title="My word lists" type="mine" />

          <FlatList
            horizontal
            data={mineWordLists}
            renderItem={({item}: {item: WordListModel}) => (
              <WordListCard handlePress={handlePress} {...item} />
            )}
          />
        </View>
        <View style={tw`mb-3`}>
          <ViewAllWidget title="Topic related lists" type="topicbased" />

          <FlatList
            horizontal
            data={topicBasedWordLists}
            renderItem={({item}: {item: WordListModel}) => (
              <WordListCard handlePress={handlePress} {...item} />
            )}
          />
        </View>
        <View>
          <ViewAllWidget title="Process lists" type="process" />

          <FlatList
            horizontal
            data={processWordLists}
            renderItem={({item}: {item: WordListModel}) => (
              <WordListCard handlePress={handlePress} {...item} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    paddingTop: 20,
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: MyTheme.colors.GREY[500],
    borderEndWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    // marginHorizontal: 10,
  },
});
