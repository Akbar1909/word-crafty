/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import ActiveScreen from './_components/ActiveScreen';
import useWordScrambleController, {
  WORD_SCRAMBLE_ACTION_TYPES,
} from './_hooks/useWordScrambleController';
import WordScrambleProvider from './_context/WordScrambleContext';
import tw from 'twrnc';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface WordScrambleProps {
  // input: string;
  // output: string;
  // words: any[];
}

const words = [{word: 'hello'}, {word: 'test'}];

const WordScramble: FC<WordScrambleProps> = ({}) => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const state = useWordScrambleController(words, 0);

  const activeScreenOpacity = useSharedValue(1);

  const rActiveScreenStyle = useAnimatedStyle(() => {
    return {
      opacity: activeScreenOpacity.value,
    };
  });

  // const panGesture=useAnimated

  const updateOffsetX = (x: number) => setOffsetX(x);

  const handler = useAnimatedScrollHandler({
    onScroll(event) {
      const x = event.contentOffset.x;

      runOnJS(updateOffsetX)(x);
    },
  });

  const onViewCallBack = useCallback(
    ({viewableItems}: any) => {
      console.log('Visible items are', viewableItems);
      // Use viewable items in state or as intended
      setIndex(viewableItems[0]?.index);

      state.dispatch({
        type: WORD_SCRAMBLE_ACTION_TYPES.SET_SELECTED_WORD,
        payload: words[viewableItems[0]?.index].word.trim(),
      });
    },
    [state],
  );

  return (
    <WordScrambleProvider value={state}>
      <View style={tw`flex-1 bg-indigo-200`}>
        <Animated.View style={[tw`flex flex-1`, {width}]}>
          <ActiveScreen />
        </Animated.View>
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
