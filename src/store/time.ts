import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';
import rules from '../constants/rules';

interface TimerState {
  time: number
}

const initialState: TimerState = {
  time: rules.GAME_RESPONSE_TIME,
}

export const timerSlice = createSlice({
  name: 'timer',

  initialState,
  reducers: {
    resetTime: (state) => {
      state.time  = rules.GAME_RESPONSE_TIME
    },

    reduceTime: (state) => {
      state.time  -=1 
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.time += action.payload
    },
  },
})

export const { resetTime, reduceTime } = timerSlice.actions

export const timeStore = (state: RootState) => state.timer.time

export default timerSlice.reducer