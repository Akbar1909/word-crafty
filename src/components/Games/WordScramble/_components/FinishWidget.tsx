import {Text, View} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

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

  if (!done) {
    return null;
  }

  return (
    <Animated.View style={[tw`flex items-center justify-center`, rStyles]}>
      <View style={tw`w-[80%] h-[40%] bg-purple-800 rounded-xl p-2`}>
        <Text>Result</Text>
      </View>
    </Animated.View>
  );
};

export default FinishWidget;
