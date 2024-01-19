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
import {WordScrambleWordState} from '../_hooks/useWordScrambleController';

interface IAnimatedCharButtonProps {
  target: Position;
  org: Position;
  animatedElIndex: number;
  values: Partial<WordScrambleWordState>;
  char: string;
  handleAnimationCompletion: ({
    values,
    animatedElIndex,
  }: {
    values: Partial<WordScrambleWordState>;
    animatedElIndex: number;
  }) => void;
}

const AnimatedCharButton: FC<IAnimatedCharButtonProps> = ({
  target,
  org,
  handleAnimationCompletion,
  animatedElIndex,
  values,
  char,
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
    x.value = withTiming(target.x, {duration: 200}, () => {
      runOnJS(handleAnimationCompletion)({
        animatedElIndex,
        values,
      });
    });
    y.value = withTiming(target.y, {duration: 200});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, handleAnimationCompletion, animatedElIndex, values]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: CHAR_BUTTON_SIZE,
          height: CHAR_BUTTON_SIZE,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        },
        rStyle,
      ]}>
      <CharButtonText char={char} />
    </Animated.View>
  );
};

export default AnimatedCharButton;
