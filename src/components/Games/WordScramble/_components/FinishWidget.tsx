import {Text, View} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import useWordScrambleContext from '../_context/useWordScrambleContext';

interface FinishWidgetProps {
  done: boolean;
}

const FinishWidget: FC<FinishWidgetProps> = ({done}) => {
  const flex = useSharedValue(1);

  const rStyles = useAnimatedStyle(() => {
    return {
      flex: flex.value,
    };
  });

  const {output} = useWordScrambleContext();

  const counts: any = Object.entries(output).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.length,
    }),
    {},
  );

  if (!done) {
    return null;
  }

  return (
    <Animated.View style={[tw`flex items-center justify-center`, rStyles]}>
      <View style={tw`w-[80%] h-[40%] bg-purple-800 rounded-xl p-2`}>
        <Text style={tw`text-xl`}>Result</Text>
        <Text>Correct: {counts.correct || 0}</Text>
        <Text>Incorrect: {counts?.touched || 0}</Text>
      </View>
    </Animated.View>
  );
};

export default FinishWidget;
