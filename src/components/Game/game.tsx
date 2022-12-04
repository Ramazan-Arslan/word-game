import React from 'react';
import './game.scss';
import Timer from '../Timer/timer';
import Users from '../../enums/users';
import { useAppSelector } from '../../store/hook';
import ComputerActions from '../ComputerAction/computerActions';
import UserActions from '../UserAction/userActions';

// represents game, renders user actions according to activePlayer.
const Game = () => {
  const activePlayer = useAppSelector((state) => state.player.activePlayer);
  const words = useAppSelector((state) => state.words.words);

  return (
    <div className='game-container'>
      <p>
        Gamer: {activePlayer === Users.COMPUTER ? <ComputerActions /> : <UserActions />}
      </p>
      <hr />
      <p>Last word: {words[words.length - 1]}</p>
      <hr />
      <Timer />
    </div>
  );
};

export default Game;
