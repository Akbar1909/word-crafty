import {View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';

interface PositionMeasurerProps {
  children: any;
  style: any;
  handleOutput: ({y}: {y: number}) => void;
}

const PositionMeasurer: FC<PositionMeasurerProps> = ({
  children,
  style,
  handleOutput,
}) => {
  const viewRef = useRef<View>(null);

  useEffect(() => {
    if (!viewRef.current) {
      return;
    }

    viewRef.current.measure((x: number, y: number) => {
      // updateCharsLocation({x, y, i: index, boxType});
      handleOutput({y});
    });
  }, [handleOutput]);

  return (
    <View ref={viewRef} style={[style]}>
      {children}
    </View>
  );
};

export default PositionMeasurer;
