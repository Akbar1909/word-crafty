import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function WordListCard() {
  return (
    <View style={styles.root}>
      <Text>WordListCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
});
