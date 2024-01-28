/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useReducer, useRef, useState, useCallback, useMemo} from 'react';
import {WordModel} from '../../../../data/word';
import {
  findSpecialCharIndexes,
  removeEmptySpace,
  replaceAt,
  shuffle,
} from '../../../../helpers/common';
import AnimatedCharButton from '../_components/AnimatedCharButton';
import {Position} from '../../../../helpers/types';
import {WordDefinitionModel} from '../../../../data/word-definition';

export type WordScrambleWordState = {
  definition: WordDefinitionModel['definition'];
  word: WordModel['word'];
  trimmedWord: string;
  history: any[];
  firstBox: any[];
  secondBox: any[];
  emptySpaceIndexes: number[];
  textWithoutEmptySpace: string;
  shuffledWord: string;
  input: string;
  answerStatus: 'initial' | 'correct' | 'error' | 'touched' | 'dirty';
  dirty: boolean;
  splitedWord: string[];
};

export type BoxType = 'first' | 'second';

export type WordScrambleControllerStateType = {
  selectedWord: string;
  words: Record<string, WordScrambleWordState>;
  index: number;
  total: number;
  done: boolean;
};

export enum WORD_SCRAMBLE_ACTION_TYPES {
  SET_SELECTED_WORD = 'setSelectedWord',
  SET_NEW_VALUE_TO_WORD_PROPERTY = 'setNewValueToWordProperty',
  NEXT_WORD = 'nextWord',
  PREV_INDEX = 'prevIndex',
  FINISH_GAME = 'finishGame',
}

type SetSelectedWordAction = {
  type: WORD_SCRAMBLE_ACTION_TYPES.SET_SELECTED_WORD;
  payload: string;
};

type NextWordAction = {
  type: WORD_SCRAMBLE_ACTION_TYPES.NEXT_WORD;
  payload: string;
};

type FinishGame = {
  type: WORD_SCRAMBLE_ACTION_TYPES.FINISH_GAME;
};

type SetNewValueToWordPropertyAction = {
  type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY;
  payload: Partial<Omit<WordScrambleWordState, 'word'>> & {word: string};
};

export type WordScrambleActions =
  | SetNewValueToWordPropertyAction
  | SetSelectedWordAction
  | NextWordAction
  | FinishGame;

const prepareHistoryInitialValue = (
  initialState: Record<string, WordScrambleWordState>,
  type: 'shuffledWord' | 'input' = 'input',
) =>
  Object.values(initialState).reduce(
    (acc, cur) => ({...acc, [cur.trimmedWord]: [cur[type]]}),
    {},
  );

type Temp = WordDefinitionModel & {word: string; wordId: number};

const prepareInitialState = (
  words: Temp[],
): Record<string, WordScrambleWordState> =>
  words.reduce((acc = {}, {word, definition}) => {
    const trimmedWord = word.trim();
    const textWithoutEmptySpace = removeEmptySpace(trimmedWord).toLowerCase();

    return {
      ...acc,
      [trimmedWord]: {
        definition,
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
  // @ts-ignore
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
    case WORD_SCRAMBLE_ACTION_TYPES.NEXT_WORD:
      return {
        ...state,
        selectedWord: payload.trim(),
        index: state.index + 1,
      };
    case WORD_SCRAMBLE_ACTION_TYPES.FINISH_GAME:
      return {
        ...state,
        done: true,
      };
    default:
      return state;
  }
};

const useWordScrambleController = (words: Temp[]) => {
  const initialState = useMemo(() => prepareInitialState(words), [words]);

  const [state, dispatch] = useReducer(reducer, {
    words: initialState,
    selectedWord: words[0].word.trim(),
    index: 0,
    total: words.length,
    done: false,
  });

  const {index, words: preparedWords} = state;

  const output = Object.values(preparedWords).reduce(
    (acc, cur) => ({
      ...acc,
      // @ts-ignore
      [cur.answerStatus]: Array.isArray(acc?.answerStatus)
        ? // @ts-ignore
          [...acc.answerStatus, cur]
        : [cur],
    }),
    {} as Record<string, WordScrambleWordState[]>,
  );

  const {
    input,
    shuffledWord,
    word,
    trimmedWord,
    textWithoutEmptySpace,
    answerStatus,
  } = state.words[state.selectedWord];

  const history = useRef<Array<{first: number; second: number}>>([]);

  const inputHistory = useRef<Record<string, string[]>>(
    prepareHistoryInitialValue(initialState),
  );

  const shuffledWordHistory = useRef<Record<string, string[]>>(
    prepareHistoryInitialValue(initialState, 'shuffledWord'),
  );

  const [elements, setElements] = useState<any[]>([]);

  const firstBoxY = useRef<number>(0);
  const secondBoxY = useRef<number>(0);

  const locationRef = useRef<Record<BoxType, Record<string, Position>>>({
    first: {},
    second: {},
  });

  const {first, second} = locationRef.current;

  const nextWord = useCallback(() => {
    history.current = [];
    dispatch({
      type: WORD_SCRAMBLE_ACTION_TYPES.NEXT_WORD,
      payload: words[index + 1].word,
    });
  }, [words, index]);

  const finishGame = useCallback(() => {
    history.current = [];
    dispatch({type: WORD_SCRAMBLE_ACTION_TYPES.FINISH_GAME});
  }, []);

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
        const els = [...prev];
        els.shift();
        return els;
      });

      const output = removeEmptySpace(values.input || '');
      const outputLen = output?.length || -1;

      dispatch({
        type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
        payload: {
          ...values,
          word,
          ...(output === textWithoutEmptySpace && {
            answerStatus: 'correct',
          }),
          ...(outputLen === textWithoutEmptySpace.length &&
            output !== textWithoutEmptySpace && {
              answerStatus: 'error',
            }),
          ...(outputLen < textWithoutEmptySpace.length && {
            answerStatus: 'initial',
          }),
        },
      });
    },
    [word, textWithoutEmptySpace],
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
    const lastNewShuffledWord = shuffledWordHistory.current[trimmedWord].at(
      -1,
    ) as string;
    const targetIndex = history.current.find(({first}) => first === orgIndex)
      ?.second as number;

    history.current = history.current.filter(({first}) => first !== orgIndex);

    const targetPosition = {
      ...second[targetIndex],
      y: secondBoxY.current + second[targetIndex].y,
    };

    const newInput = replaceAt(input, ' ', orgIndex);
    dispatch({
      type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {input: newInput, word},
    });

    inputHistory.current[trimmedWord].push(newInput);

    const newShuffledWord = replaceAt(lastNewShuffledWord, char, targetIndex);

    shuffledWordHistory.current[trimmedWord].push(newShuffledWord);

    setElements(prev => [
      ...prev,
      <AnimatedCharButton
        values={{shuffledWord: newShuffledWord}}
        org={{...position, y: firstBoxY.current}}
        char={char}
        target={targetPosition}
        handleAnimationCompletion={handleAnimationCompletion}
        elIndex={prev.length}
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
    const lastInput = inputHistory.current[trimmedWord].at(-1) as string;

    const targetIndex = lastInput.split('').findIndex(ichar => ichar === ' ');

    const targetPosition = {
      ...first[targetIndex],
      y: firstBoxY.current + first[targetIndex].y,
    };

    history.current.push({first: targetIndex, second: orgIndex});

    const newShuffledWord = replaceAt(shuffledWord, ' ', orgIndex);

    dispatch({
      type: WORD_SCRAMBLE_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY,
      payload: {shuffledWord: newShuffledWord, word},
    });

    shuffledWordHistory.current[trimmedWord].push(newShuffledWord);

    const newInput = replaceAt(lastInput, char, targetIndex);

    inputHistory.current[trimmedWord].push(newInput);

    setElements(prev => [
      ...prev,
      <AnimatedCharButton
        values={{input: newInput}}
        char={char}
        org={{...position, y: secondBoxY.current}}
        target={targetPosition}
        handleAnimationCompletion={handleAnimationCompletion}
        elIndex={prev.length}
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
    nextWord,
    finishGame,
    output,
  };
};

export default useWordScrambleController;
