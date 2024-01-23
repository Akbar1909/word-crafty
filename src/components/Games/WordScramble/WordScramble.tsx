/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActiveScreen from './_components/ActiveScreen';
import useWordScrambleController from './_hooks/useWordScrambleController';
import WordScrambleProvider from './_context/WordScrambleContext';
import tw from 'twrnc';
interface WordScrambleProps {
  // input: string;
  // output: string;
  // words: any[];
}

const WordScramble: FC<WordScrambleProps> = ({}) => {
  const state = useWordScrambleController([{word: 'fed upsomeone'}], 0);

  return (
    <WordScrambleProvider value={state}>
      <View style={tw`flex-1 p-1 bg-indigo-200`}>
        <View style={{height: 40}}>
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
  },
});

export default WordScramble;
