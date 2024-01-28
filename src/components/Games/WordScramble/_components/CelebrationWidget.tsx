import React from 'react';
import {StyleSheet} from 'react-native';
import {Canvas} from '@shopify/react-native-skia';
import {Balloon} from 'react-native-fiesta';

function CelebrationWidget() {
  return (
    <Canvas style={styles.canvas}>
      <Balloon x={50} y={50} color={'rgba(255, 0, 255, 0.4)'} depth={0.4} />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});

export default CelebrationWidget;
