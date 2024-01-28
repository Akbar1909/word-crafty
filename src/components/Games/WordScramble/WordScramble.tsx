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
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';

interface WordScrambleProps {
  // input: string;
  // output: string;
  // words: any[];
  listQueryKey: any;
}

const words = [
  {
    word: 'hello',
    definition:
      'It is a long established fact that a reader will be distracted by the readable content',
  },
  {
    word: 'test',
    definition:
      'It is a long established fact that a reader will be distracted by the readable content',
  },
  {
    word: 'decline',
    definition:
      'It is a long established fact that a reader will be distracted by the readable content',
  },
  {
    word: 'september',
    definition:
      'It is a long established fact that a reader will be distracted by the readable content',
  },
];

const WordScramble: FC<WordScrambleProps> = ({listQueryKey}) => {
  const dimensions = useWindowDimensions();
  const width = useSharedValue(dimensions.width);
  const opacity = useSharedValue(1);
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(listQueryKey);
  const preparedWords = Array.isArray(data?.data?.list) ? data?.data?.list : [];
  const state = useWordScrambleController(words as any);

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

export default WordScramble;
