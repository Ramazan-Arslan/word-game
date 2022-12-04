import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hook';

import { reduceTime } from '../../store/time';
import { endGame, incrementNumberOfPlays, addReason,setGameWinner } from '../../store/game';
import { resetPossibleWords } from '../../store/words';
import Results from '../../constants/gameResults';
import Users from '../../enums/users';

// timer function for the game
const Timer = () => {
  const time = useAppSelector((state) => state.timer.time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval> | undefined = undefined;
    if (time === 0) {
      dispatch(setGameWinner(Users.COMPUTER));
      dispatch(endGame());
      dispatch(incrementNumberOfPlays());
      dispatch(resetPossibleWords());
      dispatch(addReason(Results.TIME_IS_OVER));
      clearInterval(timerInterval);
    } else {
      timerInterval = setInterval(() => {
        dispatch(reduceTime());
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [time]);

  return (
    <div className='container'>
      <p>Remaning Time: {time}</p>
    </div>
  );
};
export default Timer;
