import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';
import names from '../assets/names.json';

interface WordsState {
  words: string[],
  possibleWords: string[],
}

const initialState: WordsState = {
  words: [],
  possibleWords: names,
}

export const wordsSlice = createSlice({
  name: 'words',

  initialState,
  reducers: {
    insertWord: (state, action: PayloadAction<string>) => {
      state.words.push(action.payload);
    },

    resetWords: (state) => {
      state.words = [];
    },

    resetPossibleWords: (state) => {
      state.possibleWords = names;
    },

    removeWordFromPossibleWords: (state, action: PayloadAction<string>) => {
      const index = state.possibleWords.indexOf(action.payload);
      state.possibleWords.splice(index,1);
    },
  },
})

export const { insertWord,resetWords,removeWordFromPossibleWords,resetPossibleWords } = wordsSlice.actions

export const wordsStore = (state: RootState) => state.words

export default wordsSlice.reducer