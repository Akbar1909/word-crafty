import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WordScramble from '../../components/Games/WordScramble';
import tw from 'twrnc';

const WordScrambleScreen = ({route, navigation}: any) => {
  const {listQueryKey} = route.params || {listQueryKey: ''};

  useEffect(() => {
    return () => console.log('unmount');
  }, [navigation]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <WordScramble listQueryKey={listQueryKey} />
    </SafeAreaView>
  );
};

export default WordScrambleScreen;

const styles = StyleSheet.create({});
