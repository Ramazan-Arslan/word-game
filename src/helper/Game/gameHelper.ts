export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// return number for computer's response time 
export const getComputerResponseTime = (max: number): number => {
  return getRandomNumber(0, max);
};

// return number for computer's response time 
export const computerResponseChecker = (failurePossibity: number): boolean => {
  const randomNumber = getRandomNumber(1, 100);
  if (randomNumber > failurePossibity) {
    return true;
  }
  return false;
};

// controls said word is valid or not
export const wordChecker = (
  saidWord: string,
  previousSaidWord: string,
  properWords: string[],
): boolean => {
  if (properWords.includes(saidWord) && saidWord[0] === getLastCharOfWord(previousSaidWord)) {
    return true;
  }
  return false;
};

export const getRandomWord = (possibleWords: string[]): string => {
  return possibleWords[getRandomNumber(0, possibleWords.length)];
};

// return convenient words according to last char of the last said word
export const getConvenientWords = (words: string[], lastSaidWord: string): string[] => {
  const lastChar = getLastCharOfWord(lastSaidWord);
  const convenientWords = words.filter((word) => word[0] === lastChar);
  return convenientWords;
};

export const getLastCharOfWord = (word: string): string => {
  return word[word.length - 1];
};
