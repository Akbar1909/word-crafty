/* eslint-disable react-native/no-inline-styles */
import React, {FC, useRef} from 'react';
import {View, Pressable} from 'react-native';
import {CHAR_BUTTON_SIZE} from '../constant';
import useWordScrambleContext from '../_context/useWordScrambleContext';
import {BoxType} from '../_hooks/useWordScrambleController';
import CharButtonText from './CharButtonText';

interface CharButtonProps {
  char: string;
  index: number;
  boxType: BoxType;
  top: number;
}

const CharButton: FC<CharButtonProps> = ({char, index, boxType, top}) => {
  const {handleCharButtonTap, updateCharsLocation} = useWordScrambleContext();

  const viewRef = useRef<View>(null);

  // useEffect(() => {
  //   // UIManager.measure(handle as number, (x: number, y: number) => {
  //   //   console.log({x, y});
  //   //   updateCharsLocation({x, y, i: index, boxType});
  //   // });

  //   setTimeout(() => {
  //     if (!viewRef.current) {
  //       return;
  //     }

  //     viewRef.current.measure((x: number, y: number) => {
  //       console.log({x, y, boxType});
  //       updateCharsLocation({x, y, i: index, boxType});
  //     });
  //   }, 0);
  // }, [index, boxType, updateCharsLocation]);

  return (
    <View
      ref={viewRef}
      onLayout={event => {
        event.target.measure((x: number, y: number) => {
          // console.log({x, y});

          updateCharsLocation({x, y, i: index, boxType});
        });
      }}
      style={{
        width: CHAR_BUTTON_SIZE,
        height: CHAR_BUTTON_SIZE,
        backgroundColor: 'red',
      }}>
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
