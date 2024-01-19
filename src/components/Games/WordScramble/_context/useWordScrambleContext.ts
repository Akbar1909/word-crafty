import {useContext} from 'react';
import {WordScrambleContext} from './WordScrambleContext';
const useWordScrambleContext = () => {
  return useContext(WordScrambleContext);
};

export default useWordScrambleContext;
