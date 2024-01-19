import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

const ScreenWrapper: FC<{children: any}> = ({children}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  wrapper: {
    width: '96%',
    alignItems: 'center',
  },
});
