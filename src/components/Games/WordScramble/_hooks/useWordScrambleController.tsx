/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback} from 'react';
import {WordModel} from '../../../../data/word';
import {
  findSpecialCharIndexes,
  removeEmptySpace,
  replaceAt,
  shuffle,
} from '../../../../helpers/common';
import {useReducer, useRef, useState} from 'react';
import AnimatedCharButton from '../_components/AnimatedCharButton';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';

import {Position} from '../../../../helpers/types';

export type WordScrambleWordState = {
  word: WordModel['word'];
  trimmedWord: string;
  history: any[];
  firstBox: any[];
  secondBox: any[];
  emptySpaceIndexes: number[];
  textWithoutEmptySpace: string;
  shuffledWord: string;
  input: string;
  answerStatus: 'initial' | 'correct' | 'error';
  dirty: boolean;
  splitedWord: string[];
};

export type BoxType = 'first' | 'second';

export type WordScrambleControllerStateType = {
  selectedWord: string;
  words: Record<string, WordScrambleWordState>;
};

export enum WORD_SCRAMBLE_ACTION_TYPES {
  SET_SELECTED_WORD = 'setSelectedWord',
  SET_NEW_VALUE_TO_WORD_PROPERTY = 'setNewValueToWordProperty',
}

type SetSelectedWordAction = {
  type: WORD_SCRAMBLE_ACTION_TYPES.SET_SELECTED_WORD;
  payload: string;
};

type SetNewValueToWordPropertyAction = {
  type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY;
  payload: Partial<Omit<WordScrambleWordState, 'word'>> & {word: string};
};

export type WordScrambleActions =
  | SetNewValueToWordPropertyAction
  | SetSelectedWordAction;

const prepareInitialState = (words: WordModel[]) =>
  words.reduce((acc = {}, {word}) => {
    const trimmedWord = word.trim();
    const textWithoutEmptySpace = removeEmptySpace(trimmedWord);

    return {
      ...acc,
      [trimmedWord]: {
        word,
        trimmedWord: trimmedWord,
        history: [],
        firstBox: [],
        secondBox: [],
        emptySpaceIndexes: findSpecialCharIndexes(word),
        textWithoutEmptySpace,
        shuffledWord: shuffle(textWithoutEmptySpace),
        input: ' '.repeat(word.length),
        answerStatus: 'initial',
        dirty: false,
        splitedWord: word.split(' '),
      },
    };
  }, {});

const reducer = (
  state: WordScrambleControllerStateType,
  {type, payload}: WordScrambleActions,
) => {
  switch (type) {
    case WORD_SCRAMBLE_ACTION_TYPES.SET_SELECTED_WORD:
      return {
        ...state,
        selectedWord: payload,
      };
    case WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY:
      return {
        ...state,
        words: {
          ...state.words,
          [payload.word]: {
            ...state.words[payload.word],
            ...payload,
          },
        },
      };
    default:
      return state;
  }
};

let firstBox: number[] = [];
let secondBox: number[] = [];
let history: Array<{first: number; second: number}> = [];

const useWordScrambleController = (words: WordModel[], index: number) => {
  const [state, dispatch] = useReducer(reducer, {
    words: prepareInitialState(words),
    selectedWord: words[index].word.trim(),
  });

  const [elements, setElements] = useState<any[]>([]);

  const {input, shuffledWord, word} = state.words[state.selectedWord];
  const firstBoxY = useRef<number>(0);
  const secondBoxY = useRef<number>(0);

  const locationRef = useRef<Record<BoxType, Record<string, Position>>>({
    first: {},
    second: {},
  });

  const {first, second} = locationRef.current;

  const updateCharsLocation = ({
    x,
    y,
    i,
    boxType,
  }: Position & {i: number; boxType: BoxType}) => {
    locationRef.current[boxType][i] = {
      x,
      y,
    };
  };

  const updateBoxY = (y: number, boxType: 'first' | 'second') => {
    if (boxType === 'first') {
      firstBoxY.current = y;
    } else {
      secondBoxY.current = y;
    }
  };

  const handleAnimationCompletion = useCallback(
    ({values}: {values: Partial<WordScrambleWordState>}) => {
      setElements(prev => {
        prev.shift();
        return prev;
      });

      dispatch({
        type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
        payload: {...values, word},
      });
    },
    [word],
  );

  const handleFirstBoxTap = ({
    position,
    char,
    orgIndex,
  }: {
    position: Position;
    char: string;
    orgIndex: number;
  }) => {
    const targetIndex = history.find(({first}) => first === orgIndex)
      ?.second as number;
    firstBox = firstBox.filter(i => i !== orgIndex);
    history = history.filter(({first}) => first !== orgIndex);

    const targetPosition = {
      ...second[targetIndex],
      y: secondBoxY.current + second[targetIndex].y,
    };

    const newInput = replaceAt(input, ' ', orgIndex);
    dispatch({
      type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {input: newInput, word},
    });

    const newShuffledWord = replaceAt(shuffledWord, char, targetIndex);

    setElements(prev => [
      ...prev,
      <AnimatedCharButton
        values={{shuffledWord: newShuffledWord}}
        org={{...position, y: firstBoxY.current}}
        char={char}
        target={targetPosition}
        handleAnimationCompletion={handleAnimationCompletion}
      />,
    ]);
  };

  const handleSecondBoxTap = ({
    position,
    char,
    orgIndex,
  }: {
    position: Position;
    char: string;
    orgIndex: number;
  }) => {
    const targetIndex = input
      .split('')
      .findIndex((ichar, i) => ichar === ' ' && !firstBox.includes(i));
    firstBox.push(targetIndex);
    const targetPosition = {
      ...first[targetIndex],
      y: firstBoxY.current + first[targetIndex].y,
    };

    console.log({targetPosition, targetIndex});

    history.push({first: targetIndex, second: orgIndex});

    const newShuffledWord = replaceAt(shuffledWord, ' ', orgIndex);

    dispatch({
      type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {shuffledWord: newShuffledWord, word},
    });

    const newInput = replaceAt(input, char, targetIndex);

    setElements(prev => [
      ...prev,
      <AnimatedCharButton
        values={{input: newInput}}
        char={char}
        org={{...position, y: secondBoxY.current}}
        target={targetPosition}
        handleAnimationCompletion={handleAnimationCompletion}
      />,
    ]);
  };

  const handleCharButtonTap = ({
    i,
    boxType,
    char,
  }: {
    i: number;
    boxType: BoxType;
    char: string;
  }) => {
    const position = locationRef.current[boxType][i];

    const args = {
      position,
      char,
      orgIndex: i,
    };

    if (char.trim().length === 0) {
      return;
    }

    if (boxType === 'first') {
      return handleFirstBoxTap(args);
    }

    handleSecondBoxTap(args);
  };

  return {
    state,
    dispatch,
    currentWordState: state.words[state.selectedWord],
    handleCharButtonTap,
    updateCharsLocation,
    elements,
    updateBoxY,
  };
};

export default useWordScrambleController;
