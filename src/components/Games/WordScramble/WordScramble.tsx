/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import ActiveScreen from './_components/ActiveScreen';
import useWordScrambleController from './_hooks/useWordScrambleController';
import WordScrambleProvider from './_context/WordScrambleContext';
import tw from 'twrnc';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import FinishWidget from './_components/FinishWidget';
import Header from './_components/Header';

interface WordScrambleProps {
  // input: string;
  // output: string;
  // words: any[];
}

const words = [{word: 'hello'}, {word: 'test'}];

const WordScramble: FC<WordScrambleProps> = ({}) => {
  const dimensions = useWindowDimensions();
  const width = useSharedValue(dimensions.width);
  const opacity = useSharedValue(1);
  const state = useWordScrambleController(words);

  return (
    <WordScrambleProvider value={state}>
      {!state.state.done && <Header word={''} key={state.state.index} />}
      <View style={tw`flex-1 bg-indigo-200`}>
        {!state.state.done && (
          <Animated.View style={[tw`flex flex-1`, {width, opacity}]}>
            <ActiveScreen />
          </Animated.View>
        )}
        <FinishWidget done={state.state.done} />
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
