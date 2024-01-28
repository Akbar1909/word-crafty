import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WordScramble from '../../components/Games/WordScramble';
import tw from 'twrnc';

const WordScrambleScreen = ({route}: any) => {
  const {listQueryKey} = route.params;
  console.log({listQueryKey}, 'test');
  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <WordScramble listQueryKey={listQueryKey} />
    </SafeAreaView>
  );
};

export default WordScrambleScreen;

const styles = StyleSheet.create({});
