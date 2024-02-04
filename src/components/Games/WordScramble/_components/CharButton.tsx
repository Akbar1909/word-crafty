/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef, useEffect, useCallback} from 'react';
import {View, Pressable} from 'react-native';
import {CHAR_BUTTON_SIZE} from '../constant';
import useWordScrambleContext from '../_context/useWordScrambleContext';
import {BoxType} from '../_hooks/useWordScrambleController';
import CharButtonText from './CharButtonText';
import tw from 'twrnc';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface CharButtonProps {
  char: string;
  index: number;
  boxType: BoxType;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const INIT_BACK_COLOR = '#8B5CF6';
export const INIT_BORDER_COLOR = '#6D27D9';
const PRESSED_BACK_COLOR = '#a78bfacc';
const PRESSED_BORDER_COLOR = '#a78bfa';
const CORRECT_BACK_COLOR = '#11B981';
const CORRECT_BORDER_COLOR = '#069668';
const ERROR_BACK_COLOR = '#F77171';
const ERROR_BORDER_COLOR = '#B91C1B';

const CharButton: FC<CharButtonProps> = ({char, index, boxType}) => {
  const {
    handleCharButtonTap,
    updateCharsLocation,
    currentWordState: {answerStatus},
  } = useWordScrambleContext();
  const viewRef = useRef<View>(null);
  const translateY = useSharedValue(0);
  const elevation = useSharedValue(0);
  const bgColor = useSharedValue(0);
  const borderColor = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateY.value},
        {scaleX: scale.value},
        {scaleY: scale.value},
        {rotate: `${rotate.value}deg`},
      ],
      elevation: elevation.value,
      shadowOffset: {width: 0, height: elevation.value},
      backgroundColor: INIT_BACK_COLOR,
      borderWidth: 2,
      borderColor: INIT_BORDER_COLOR,
      ...(answerStatus === 'correct' &&
        boxType === 'first' && {
          backgroundColor: interpolateColor(
            bgColor.value,
            [0, 1],
            [INIT_BACK_COLOR, CORRECT_BACK_COLOR],
          ),
          borderColor: interpolateColor(
            bgColor.value,
            [0, 1],
            [INIT_BORDER_COLOR, CORRECT_BORDER_COLOR],
          ),
        }),
      ...(answerStatus === 'error' &&
        boxType === 'first' && {
          backgroundColor: interpolateColor(
            bgColor.value,
            [0, 1],
            [INIT_BACK_COLOR, ERROR_BACK_COLOR],
          ),
          borderColor: interpolateColor(
            bgColor.value,
            [0, 1],
            [INIT_BORDER_COLOR, ERROR_BORDER_COLOR],
          ),
        }),
    };
  });
  const handlePressIn = () => {
    scale.value = withTiming(1.2);
  };

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1);
  }, [scale]);

  useEffect(() => {
    if (boxType === 'second') {
      return;
    }

    if (answerStatus === 'correct' || answerStatus === 'error') {
      scale.value = withDelay(index * 30, withTiming(1.07));
      bgColor.value = withDelay(index * 30, withTiming(1));
      borderColor.value = withDelay(index * 30, withTiming(1));
    } else if (answerStatus === 'touched') {
      scale.value = withDelay(index * 30, withTiming(1.07));
      bgColor.value = withDelay(index * 30, withTiming(0));
      borderColor.value = withDelay(index * 30, withTiming(0));
    }
  }, [
    answerStatus,
    scale,
    bgColor,
    index,
    boxType,
    borderColor,
    handlePressOut,
  ]);

  useEffect(() => {
    if (boxType === 'first' && char.trim()) {
      scale.value = withSequence(withTiming(1.5), withTiming(1));
      rotate.value = withSequence(withTiming(40), withTiming(0));
    }
  }, [char, boxType, scale, rotate]);

  useEffect(() => {
    if (!viewRef.current) {
      return;
    }

    viewRef.current.measure((x: number, y: number) => {
      updateCharsLocation({x, y, i: index, boxType});
    });
  }, [index, boxType, updateCharsLocation]);

  return (
    <AnimatedPressable
      ref={viewRef}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        {
          width: CHAR_BUTTON_SIZE,
          height: CHAR_BUTTON_SIZE,
          alignItems: 'center',
          justifyContent: 'center',
          // borderWidth: 2,
        },
        tw`bg-indigo-500 rounded-lg`,
        rStyles,
      ]}
      onPress={() => {
        if (answerStatus !== 'correct') {
          handleCharButtonTap({i: index, boxType, char});
        }
      }}>
      <CharButtonText char={char} />
    </AnimatedPressable>
  );
};

export default CharButton;
