/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Text, View, useWindowDimensions} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import tw from 'twrnc';
import {
  ERROR_COLOR,
  HEADER_HEIGHT,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from '../constant';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import useWordScrambleContext from '../_context/useWordScrambleContext';

const EMOJI_CONTAINER_WIDTH = 40;
const FINISH_BUTTON_CONTAINER_WIDTH = 40;

interface HeaderProps {
  word: string;
}

const Header: FC<HeaderProps> = ({word}) => {
  const stoppedTimer = useRef(false);
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const {
    finishGame,
    nextWord,
    state: {total, index},
  } = useWordScrambleContext();

  const TIME_CONTAINER_WIDTH =
    SCREEN_WIDTH - EMOJI_CONTAINER_WIDTH - FINISH_BUTTON_CONTAINER_WIDTH;
  const STEPPER = TIME_CONTAINER_WIDTH / 20;

  const width = useSharedValue(TIME_CONTAINER_WIDTH);
  const bgColor = useSharedValue(1);
  const opacity = useSharedValue(1);

  const rStyles = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: interpolateColor(
      bgColor.value,
      [0, 0.5, 1],
      [ERROR_COLOR, WARNING_COLOR, SUCCESS_COLOR],
    ),
    opacity: opacity.value,
  }));

  useEffect(() => {
    const flooredValue = Math.floor(width.value);
    if ((flooredValue === 0 || flooredValue < 0) && index + 1 === total) {
      finishGame();
    }
  }, [width, index, total]);

  useEffect(() => {
    if (stoppedTimer.current) {
      return;
    }
    const intervalId = setInterval(() => {
      width.value = withTiming(width.value - STEPPER, {
        easing: Easing.linear,
        duration: 1000,
      });

      const flooredValue = Math.floor(width.value);
      const rating = width.value / TIME_CONTAINER_WIDTH;

      if (rating < 0.75 && rating > 0.5) {
        bgColor.value = withTiming(0.5);
      } else if (rating < 0.35) {
        bgColor.value = withTiming(0);
        opacity.value = withRepeat(withTiming(0.8, {duration: 500}), -1);
      }

      if ((flooredValue === 0 || flooredValue < 0) && index + 1 === total) {
        finishGame();
        stoppedTimer.current = true;
        clearInterval(intervalId);
        return;
      }

      if (flooredValue === 0 || flooredValue < 0) {
        nextWord();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [width, STEPPER, nextWord, finishGame, total, index, word]);

  return (
    <View style={[tw`bg-red-700 flex-row`, {height: HEADER_HEIGHT}]}>
      <View
        style={[
          tw`h-full bg-green-100 flex items-center justify-center`,
          {width: EMOJI_CONTAINER_WIDTH},
        ]}>
        <Text style={tw`text-3xl`}>😄</Text>
      </View>
      <View style={tw`flex-1 bg-gray-400`}>
        <Animated.View
          style={[tw`bg-blue-300 `, {height: HEADER_HEIGHT}, rStyles]}
        />
      </View>
      <View
        style={[
          tw`w-[10] h-full bg-green-100`,
          {width: FINISH_BUTTON_CONTAINER_WIDTH},
        ]}
      />
    </View>
  );
};

export default Header;
