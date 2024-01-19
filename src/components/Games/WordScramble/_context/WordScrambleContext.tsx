import React, {createContext, FC} from 'react';
import useWordScrambleController, {
  WordScrambleWordState,
} from '../_hooks/useWordScrambleController';

export const WordScrambleContext = createContext<
  ReturnType<typeof useWordScrambleController>
>({
  state: {
    selectedWord: '',
    words: {},
  },
  currentWordState: {} as WordScrambleWordState,
  dispatch: '' as any,
  handleCharButtonTap: '' as any,
  updateCharsLocation: '' as any,
  elements: [],
  updateBoxY: '' as any,
});

const WordScrambleProvider: FC<{
  value: ReturnType<typeof useWordScrambleController>;
  children: any;
}> = ({value, children}) => {
  return (
    <WordScrambleContext.Provider value={value}>
      {children}
    </WordScrambleContext.Provider>
  );
};

export default WordScrambleProvider;
