/* eslint-disable react-native/no-inline-styles */
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import React, {FC, useEffect} from 'react';
import {CHAR_BUTTON_SIZE} from '../constant';
import {Position} from '../../../../helpers/types';
import CharButtonText from './CharButtonText';
import tw from 'twrnc';
import {WordScrambleWordState} from '../_hooks/useWordScrambleController';
import {INIT_BACK_COLOR, INIT_BORDER_COLOR} from './CharButton';
interface IAnimatedCharButtonProps {
  target: Position;
  org: Position;
  values: Partial<WordScrambleWordState>;
  char: string;
  elIndex: number;
  handleAnimationCompletion: ({
    values,
    index,
  }: {
    values: Partial<WordScrambleWordState>;
    index: number;
  }) => void;
}

const AnimatedCharButton: FC<IAnimatedCharButtonProps> = ({
  target,
  org,
  handleAnimationCompletion,
  values,
  char,
  elIndex,
}) => {
  const position = useSharedValue({x: org.x, y: org.y});

  const rStyle = useAnimatedStyle(() => {
    return {
      top: position.value.y,
      left: position.value.x,
    };
  });

  useEffect(() => {
    position.value = withTiming(
      {x: target.x, y: target.y},
      {duration: 100},
      () => {
        runOnJS(handleAnimationCompletion)({
          values,
          index: elIndex,
        });
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, handleAnimationCompletion, values, elIndex]);

  return (
    <Animated.View
      style={[
        {
          width: CHAR_BUTTON_SIZE,
          height: CHAR_BUTTON_SIZE,
          backgroundColor: INIT_BACK_COLOR,
          borderWidth: 2,
          borderColor: INIT_BORDER_COLOR,
        },
        rStyle,
        tw`absolute items-center rounded-lg justify-center`,
      ]}>
      <CharButtonText char={char} />
    </Animated.View>
  );
};

export default AnimatedCharButton;
