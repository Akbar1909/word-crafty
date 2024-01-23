/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const CharButtonText = ({char}: {char: string}) => {
  return <Text style={tw`text-white text-xl font-bold uppercase`}>{char}</Text>;
};

export default CharButtonText;
