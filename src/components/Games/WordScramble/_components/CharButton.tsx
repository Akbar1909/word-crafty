/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {CHAR_BUTTON_SIZE} from '../constant';
import useWordScrambleContext from '../_context/useWordScrambleContext';
import {BoxType} from '../_hooks/useWordScrambleController';
import CharButtonText from './CharButtonText';
import tw from 'twrnc';
import AwesomeButton from 'react-native-really-awesome-button';

interface CharButtonProps {
  char: string;
  index: number;
  boxType: BoxType;
}

const CharButton: FC<CharButtonProps> = ({char, index, boxType}) => {
  const {handleCharButtonTap, updateCharsLocation} = useWordScrambleContext();

  const viewRef = useRef<View>(null);

  useEffect(() => {
    if (!viewRef.current) {
      return;
    }

    viewRef.current.measure((x: number, y: number) => {
      updateCharsLocation({x, y, i: index, boxType});
    });
  }, [index, boxType, updateCharsLocation]);

  return (
    <View
      ref={viewRef}
      style={[
        {
          width: CHAR_BUTTON_SIZE,
          height: CHAR_BUTTON_SIZE,
        },
        tw`bg-indigo-800 rounded-lg`,
      ]}>
      <Pressable
        style={{
          width: CHAR_BUTTON_SIZE,
          height: CHAR_BUTTON_SIZE,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => handleCharButtonTap({i: index, boxType, char})}>
        <CharButtonText char={char} />
      </Pressable>
    </View>
  );
};

export default CharButton;
