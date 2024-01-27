export const findSpecialCharIndexes = (str: string, char = ' ') => {
  const output = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      output.push(i);
    }
  }

  return output;
};

export const removeEmptySpace = (input?: string) => {
  if (!input) {
    return '';
  }

  return input
    .split('')
    .filter(char => char.trim())
    .join('');
};

export const shuffle = (str: string) => {
  let a = str.split(''),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

export const replaceAt = (word: string, replacement: string, index: number) => {
  return (
    word.substring(0, index) +
    replacement +
    word.substring(index + replacement.length)
  );
};
export const compareCaseInsensitive = (str1: string, str2: string) => {
  return str1.toUpperCase() === str2.toUpperCase();
};
