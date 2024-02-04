/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable} from 'react-native';
import React, {FC, Fragment} from 'react';
import CharButton from './CharButton';
import useWordScrambleContext from '../_context/useWordScrambleContext';
import tw from 'twrnc';
import PositionMeasurer from '../../../PositionMeasurer';
import {REACT_APP_SERVER_BASE_URL} from '@env';
import FastImage from 'react-native-fast-image';

interface IActiveScreenProps {}

const ActiveScreen: FC<IActiveScreenProps> = ({}) => {
  const {
    elements,
    updateBoxY,
    nextWord,
    state: {total, index},
    finishGame,
    currentWordState: {
      emptySpaceIndexes,
      splitedWord,
      input,
      shuffledWord,
      answerStatus,
      definition,
      images,
    },
  } = useWordScrambleContext();

  // return <CelebrationWidget />;

  return (
    <>
      <View style={[tw`flex flex-1 p-2`]}>
        <View style={tw`flex-1`}>
          <View>
            <Text numberOfLines={3} style={{fontSize: 22}}>
              {definition}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
              alignItems: 'center',
            }}>
            {images.length >= 1 && (
              <FastImage
                source={{
                  uri: `${REACT_APP_SERVER_BASE_URL}/files/serve/${images[0].filename}`,
                  priority: FastImage.priority.high,
                }}
                style={{
                  width: 260,
                  height: 260,
                  margin: 'auto',
                  borderRadius: 24,
                }}
              />
            )}
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

        {answerStatus !== 'correct' && (
          <PositionMeasurer
            handleOutput={({y}) => {
              updateBoxY(y, 'second');
            }}
            style={tw`gap-1 bottom-0 py-2 px-1 rounded-lg flex-wrap justify-center flex-row`}>
            {shuffledWord.split('').map((char, i) => (
              <CharButton boxType={'second'} key={i} char={char} index={i} />
            ))}
          </PositionMeasurer>
        )}

        {answerStatus === 'correct' && total === index + 1 && (
          <View style={tw`w-full h-10`}>
            <Pressable
              onPress={finishGame}
              style={tw`py-2 px-3 bg-yellow-600 rounded-lg w-15 flex items-center justify-center`}>
              <Text style={tw`text-white font-bold`}>Finish</Text>
            </Pressable>
          </View>
        )}

        {answerStatus === 'correct' && total > index + 1 && (
          <View style={tw`w-full h-10`}>
            <Pressable
              onPress={nextWord}
              style={tw`py-2 px-3 bg-yellow-600 rounded-lg w-15 flex items-center justify-center`}>
              <Text style={tw`text-white font-bold`}>Next</Text>
            </Pressable>
          </View>
        )}
      </View>

      {elements.map((element, i) => (
        <Fragment key={i}>{element}</Fragment>
      ))}
    </>
  );
};

export default ActiveScreen;
