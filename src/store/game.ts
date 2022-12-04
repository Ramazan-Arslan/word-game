import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

// Define a type for the slice state
interface GameState {
  gameIsActive: boolean,
  numberOfPlays: number
  previousGameWinner: string|null
  reasonOfLose: string | null;
}

const initialState: GameState = {
  gameIsActive: false,
  numberOfPlays: 0,
  previousGameWinner: null,
  reasonOfLose: null,
}

export const gameSlice = createSlice({
  name: 'gamer',

  initialState,
  reducers: {
    startGame: (state) => {
      state.gameIsActive  = true
    },

    endGame: (state) => {
      state.gameIsActive  = false
    },

    incrementNumberOfPlays: (state) => {
      state.numberOfPlays  +=1 
    },

    setGameWinner: (state, action: PayloadAction<string>) => {
      state.previousGameWinner = action.payload
    },

    addReason: (state, action: PayloadAction<string>) => {
      state.reasonOfLose = action.payload
    },

  },
})

export const { startGame, endGame, incrementNumberOfPlays,setGameWinner,addReason } = gameSlice.actions

export const gameStore = (state: RootState) => state.game

export default gameSlice.reducer