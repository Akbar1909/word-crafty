/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActiveScreen from './_components/ActiveScreen';
import useWordScrambleController from './_hooks/useWordScrambleController';
import WordScrambleProvider from './_context/WordScrambleContext';

interface WordScrambleProps {
  input: string;
  output: string;
  words: any[];
}

const WordScramble: FC<WordScrambleProps> = ({}) => {
  const state = useWordScrambleController([{word: 'hello something'}], 0);

  return (
    <WordScrambleProvider value={state}>
      <View style={{flex: 1}}>
        <View style={{height: 40, backgroundColor: 'yellow'}}>
          <Text>header</Text>
        </View>
        <View style={[styles.root]}>
          <ActiveScreen />
        </View>
      </View>
    </WordScrambleProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default WordScramble;
