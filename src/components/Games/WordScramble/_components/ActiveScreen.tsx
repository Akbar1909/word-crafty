/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, useWindowDimensions, Pressable} from 'react-native';
import React, {FC, Fragment} from 'react';
import {twMerge} from 'tailwind-merge';
import CharButton from './CharButton';
import useWordScrambleContext from '../_context/useWordScrambleContext';
import tw from 'twrnc';
import PositionMeasurer from '../../../PositionMeasurer';

interface IActiveScreenProps {}

const ActiveScreen: FC<IActiveScreenProps> = ({}) => {
  const {
    elements,
    updateBoxY,
    currentWordState: {
      emptySpaceIndexes,
      splitedWord,
      input,
      shuffledWord,
      answerStatus,
    },
  } = useWordScrambleContext();

  return (
    <>
      <View style={[tw`flex flex-1`]}>
        <View style={tw`flex-1`}>
          <View>
            <Text numberOfLines={3} style={{fontSize: 22}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 255,
                height: 255,
                objectFit: 'fill',
                borderRadius: 24,
              }}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
              }}
            />
          </View>

          <PositionMeasurer
            handleOutput={({y}) => updateBoxY(y, 'first')}
            style={tw`flex flex-row items-center rounded-lg py-2 px-1  justify-center gap-1 flex-wrap`}>
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
                  {i !== 0 && <View style={tw`w-5 h-5`} />}
                  {word.split('').map((char, ix) => {
                    const index = ix + (splitedWord?.[i - 1]?.length || 0);

                    return (
                      <CharButton
                        boxType="first"
                        key={index}
                        char={char}
                        index={index}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
          </PositionMeasurer>
        </View>
        <PositionMeasurer
          handleOutput={({y}) => {
            updateBoxY(y, 'second');
          }}
          style={tw`gap-1 bottom-0 py-2 px-1 rounded-lg flex-wrap justify-center flex-row`}>
          {shuffledWord.split('').map((char, i) => (
            <CharButton boxType={'second'} key={i} char={char} index={i} />
          ))}
        </PositionMeasurer>

        <View style={tw`w-full h-10`}>
          <Pressable>
            <Text>Next</Text>
          </Pressable>
        </View>
      </View>

      {elements.map((element, i) => (
        <Fragment key={i}>{element}</Fragment>
      ))}
    </>
  );
};

export default ActiveScreen;
