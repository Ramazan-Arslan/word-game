import { configureStore } from '@reduxjs/toolkit';
import timer from './time';
import game from './game';
import player from './player';
import words from './words';
import voice from './voice';

export const store = configureStore({
  reducer: {
    timer,
    game,
    player,
    words,
    voice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
