/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
interface VoiceState {
  speechRecognition: any;
}

const initialState: VoiceState = {
  speechRecognition: null,
};

export const voiceSlice = createSlice({
  name: 'speech',

  initialState,
  reducers: {
    setSpeechRecognition: (state, action: any) => {
      state.speechRecognition = action.payload;
    },
  },
});

export const { setSpeechRecognition } = voiceSlice.actions;

export const voiceStore = (state: RootState) => state.voice;

export default voiceSlice.reducer;
