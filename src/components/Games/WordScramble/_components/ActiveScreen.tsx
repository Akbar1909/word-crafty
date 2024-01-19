/* eslint-disable react-native/no-inline-styles */
import {View, Text, useWindowDimensions, Image} from 'react-native';
import React, {FC, Fragment} from 'react';
import CharButton from './CharButton';
import useWordScrambleContext from '../_context/useWordScrambleContext';

interface IActiveScreenProps {}

const ActiveScreen: FC<IActiveScreenProps> = () => {
  const {width, height} = useWindowDimensions();

  const {
    state: {},
    elements,
    updateBoxY,
    currentWordState: {emptySpaceIndexes, splitedWord, input, shuffledWord},
  } = useWordScrambleContext();

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'blue', padding: 4}}>
        <View style={{flex: 8}}>
          <View style={{flex: 2}}>
            <View>
              <Text numberOfLines={3} style={{fontSize: 24}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                flex: 7,
              }}>
              <Image
                style={{width: 200, height: '100%', maxHeight: 200}}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
                }}
              />
            </View>
          </View>
          <View
            onLayout={event => {
              console.log(event.nativeEvent.layout.y, 'first');
            }}
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              flexWrap: 'wrap',
            }}>
            {splitedWord.map((wordChunk: string, i) => {
              const word =
                i === 0
                  ? input.slice(0, wordChunk.length)
                  : input.slice(
                      emptySpaceIndexes[i - 1],
                      emptySpaceIndexes[i - 1] + wordChunk.length,
                    );

              return (
                <Fragment key={i}>
                  {i !== 0 && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  )}
                  {word.split('').map((char, ix) => {
                    const index = ix + (splitedWord?.[i - 1]?.length || 0);

                    return (
                      <CharButton
                        boxType="first"
                        key={index}
                        char={char}
                        index={index}
                        top={height * 0.7 * +300}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
          </View>
        </View>
        <View
          onLayout={event => {
            console.log(event.nativeEvent.layout.y, 'y', 'second');
            // updateBoxY(event.nativeEvent.layout.y, 'second');
          }}
          style={{
            // position: ',
            flex: 2,
            bottom: 20,
            left: 0,
            gap: 4,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {shuffledWord.split('').map((char, i) => (
            <CharButton
              top={height * 0.7}
              boxType={'second'}
              key={i}
              char={char}
              index={i}
            />
          ))}
        </View>
      </View>

      {elements.map((element, i) => (
        <Fragment key={i}>{element}</Fragment>
      ))}
    </>
  );
};

export default ActiveScreen;
