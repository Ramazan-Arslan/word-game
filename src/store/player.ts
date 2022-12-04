import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';
import Users from '../enums/users';

interface Player {
  activePlayer: string,
  username: string,
}

const initialState: Player = {
  activePlayer: Users.COMPUTER,
  username: '',
}

export const gameSlice = createSlice({
  name: 'player',

  initialState,
  reducers: {
    changePlayer: (state) => {
      state.activePlayer = state.activePlayer === Users.COMPUTER ? Users.USER : Users.COMPUTER
    },

    setComputerTurn: (state) => {
      state.activePlayer = Users.COMPUTER
    },

    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },

  },
})

export const { changePlayer, setComputerTurn, setUserName } = gameSlice.actions

export const playerStore = (state: RootState) => state.player.activePlayer

export default gameSlice.reducer