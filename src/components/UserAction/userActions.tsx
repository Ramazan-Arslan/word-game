import React from 'react';
import Users from '../../enums/users';
import { wordChecker } from '../../helper/Game/gameHelper';

import { useAppSelector, useAppDispatch } from '../../store/hook';
import { setGameWinner, endGame, incrementNumberOfPlays,addReason } from '../../store/game';
import { changePlayer } from '../../store/player';
import { insertWord,resetPossibleWords, removeWordFromPossibleWords } from '../../store/words';
import { resetTime } from '../../store/time';
import Results from '../../constants/gameResults';

// for user's response flow
const UserActions = () => { 
  const words = useAppSelector((state) => state.words.words);
  const recognition = useAppSelector((state) => state.voice.speechRecognition);
  const possibleWords = useAppSelector((state) => state.words.possibleWords);
  const username = useAppSelector((state) => state.player.username);
  const dispatch = useAppDispatch();

  const updateGameRules = (word: string): void => {
    dispatch(resetTime());
    dispatch(removeWordFromPossibleWords(word));
    dispatch(insertWord(word));
    dispatch(changePlayer());
  };

  const endTheGame = (voiceResponse:string):void =>{
    dispatch(insertWord(voiceResponse));
    dispatch(setGameWinner(Users.COMPUTER));
    dispatch(endGame());
    dispatch(addReason(Results.INVALID_WORD));
    dispatch(resetPossibleWords());
    dispatch(incrementNumberOfPlays());
  }

 // the timeout here is so that the computer does not handle your response as input.
  setTimeout(()=>{
    recognition.start();
    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const lastcomputerWord = words[words.length - 1];
      const voiceResponse = event.results[0][0].transcript.toLowerCase();
    
      if (wordChecker(voiceResponse, lastcomputerWord, possibleWords)) {
        updateGameRules(voiceResponse);
      } else {
        endTheGame(voiceResponse);
      }
      recognition.stop();
    };
  },800);

  return <span>{username}</span>;
};

export default UserActions;
