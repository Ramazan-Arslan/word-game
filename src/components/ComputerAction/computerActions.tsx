import React from 'react';
import Rules from '../../constants/rules';
import Users from '../../enums/users';
import {
  computerResponseChecker,
  getComputerResponseTime,
  getRandomWord,
  getConvenientWords,
} from '../../helper/Game/gameHelper'
import { endGame, incrementNumberOfPlays, setGameWinner } from '../../store/game';
import { insertWord,removeWordFromPossibleWords, resetPossibleWords } from '../../store/words';
import { resetTime } from '../../store/time';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { changePlayer } from '../../store/player';

// for computer's response flow
const ComputerActions = () => {
  const words = useAppSelector((state) => state.words.words);
  const possibleWords = useAppSelector((state) => state.words.possibleWords);
  const dispatch = useAppDispatch();


  const updateGameRules = (word: string): void => {
    dispatch(resetTime());
    dispatch(removeWordFromPossibleWords(word));
    dispatch(insertWord(word));
    dispatch(changePlayer());
  };

  const endTheGame = ():void =>{
    dispatch(setGameWinner(Users.USER));
    dispatch(endGame());
    dispatch(incrementNumberOfPlays());
    dispatch(resetPossibleWords());
  }

  const wordVocalizer = (word: string): void => {
    const speechSynthesis = new SpeechSynthesisUtterance(word);
    speechSynthesis.lang = 'tr-TR';
    window.speechSynthesis.speak(speechSynthesis);
  };

  if (computerResponseChecker(Rules.COMPUTER_FAILURE_RESPONSE_PROBABLITY)) {
    setTimeout(() => {
      let computerResponse = '';
      if (words.length > 0) {
        const lastWord = words[words.length - 1];
        const relatedWords = getConvenientWords(possibleWords, lastWord);
        computerResponse = getRandomWord(relatedWords);
      } else {
        computerResponse = getRandomWord(possibleWords);
      }
      updateGameRules(computerResponse);
      wordVocalizer(computerResponse);
    }, getComputerResponseTime(Rules.GAME_RESPONSE_TIME - 1) * 1000);
  } else {
    setTimeout(()=>{
        endTheGame();
    },Rules.GAME_RESPONSE_TIME * 1000);
  }

  return <span>{Users.COMPUTER}</span>;
};

export default ComputerActions;
