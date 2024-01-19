/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React from 'react';

const CharButtonText = ({char}: {char: string}) => {
  return (
    <Text
      style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
      }}>
      {char}
    </Text>
  );
};

export default CharButtonText;
