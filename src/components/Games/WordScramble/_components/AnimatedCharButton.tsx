/* eslint-disable react-native/no-inline-styles */
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React, {FC, useEffect} from 'react';
import {CHAR_BUTTON_SIZE} from '../constant';
import {Position} from '../../../../helpers/types';
import CharButtonText from './CharButtonText';
import tw from 'twrnc';
import {WordScrambleWordState} from '../_hooks/useWordScrambleController';
import {INIT_BACK_COLOR} from './CharButton';
interface IAnimatedCharButtonProps {
  target: Position;
  org: Position;
  values: Partial<WordScrambleWordState>;
  char: string;
  elIndex: number;
  handleAnimationCompletion: ({
    values,
  }: {
    values: Partial<WordScrambleWordState>;
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
  const x = useSharedValue(org.x);
  const y = useSharedValue(org.y);

  const rStyle = useAnimatedStyle(() => {
    return {
      top: y.value,
      left: x.value,
    };
  });

  useEffect(() => {
    x.value = withTiming(target.x, {duration: 100}, () => {
      runOnJS(handleAnimationCompletion)({
        values,
      });
    });
    y.value = withTiming(target.y, {
      duration: 100,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, handleAnimationCompletion, values, elIndex]);

  return (
    <Animated.View
      style={[
        {
          width: CHAR_BUTTON_SIZE,
          height: CHAR_BUTTON_SIZE,
          backgroundColor: INIT_BACK_COLOR,
        },
        rStyle,
        tw`absolute items-center rounded-lg justify-center  border-indigo-700`,
      ]}>
      <CharButtonText char={char} />
    </Animated.View>
  );
};

export default AnimatedCharButton;
