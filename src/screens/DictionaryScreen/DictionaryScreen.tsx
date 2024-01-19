/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyTheme from '../../theme/colors';
import SPACING from '../../theme/spacing';
import {useAuth} from '../../providers/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {searchOneWord, searchWords} from '../../data/word/word.requests';
import {WordModel} from '../../data/word';
import WordFullInfoWidget from '../../components/WordFullInfoWidget';
import Hidden from '../../components/Hidden';

export default function DictionaryScreen() {
  const {navigate} = useNavigation();
  const [wordId, setWordId] = useState<null | number>(null);
  const [search, setSearch] = useState('');
  const [openDropdownMenu, setOpenDropdownMenu] = useState(true);

  const {hasValidToken} = useAuth();

  const {data} = useQuery({
    queryKey: ['words-search', search],
    queryFn: async () => await searchWords(search),
    select: response =>
      (Array.isArray(response.data?.data) ? response?.data?.data : []) as Array<
        Pick<WordModel, 'word' | 'wordId'>
      >,
    enabled: search.length > 0,
  });

  const wordState = useQuery({
    queryKey: ['word', {wordId}],
    queryFn: () => searchOneWord(wordId as number),
    enabled: false,
    select: response => response.data?.data as WordModel,
  });

  const handleSearch = (query: string) => {
    if (!hasValidToken) {
      // @ts-ignore
      // navigate('LoginScreen');
    }

    console.log({openDropdownMenu});

    setSearch(query);
  };

  const handleOnPress = (id: number, word: string) => {
    setWordId(id);
    setSearch(word);
    setOpenDropdownMenu(false);
    setTimeout(() => {
      wordState.refetch();
    }, 0);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
        }}>
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          style={styles.searchBar}
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
          onChangeText={handleSearch}
          onTouchStart={() => setOpenDropdownMenu(true)}
        />

        <FlatList
          data={data}
          style={[styles.flatList, {height: openDropdownMenu ? 400 : 0}]}
          renderItem={({item}: {item: Pick<WordModel, 'word' | 'wordId'>}) => (
            <TouchableOpacity
              onPress={() => handleOnPress(item.wordId, item.word)}
              style={styles.wordItem}>
              <Text>{item.word}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item: Pick<WordModel, 'word' | 'wordId'>) =>
            item.wordId.toString()
          }
        />

        {wordState.isSuccess && <WordFullInfoWidget {...wordState.data} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchBox: {},
  searchBar: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: MyTheme.colors.GREY[500],
    borderEndWidth: 1,
    borderRadius: 8,
    width: '94%',
  },
  flatList: {
    marginTop: 10,
    borderRadius: 8,
    width: '94%',
    position: 'absolute',
    top: 40,
    zIndex: 2,
  },
  wordItem: {
    backgroundColor: MyTheme.colors.COMMON.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: MyTheme.colors.GREY[200],
  },
  wordFull: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    width: '94%',
    // position: 'absolute',
  },
});
