import Game from './components/Game/game';
import './App.scss';
import { ChakraProvider, Button, Text, Input } from '@chakra-ui/react';
import { startGame } from './store/game';
import { setUserName } from './store/player';
import { useAppDispatch, useAppSelector } from './store/hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import GameModal from './components/Modal/modal';

const App = () => {
  const dispatch = useAppDispatch();
  const gameIsActive = useAppSelector((state) => state.game.gameIsActive);
  const previousGameWinner = useAppSelector((state) => state.game.previousGameWinner);
  const username = useAppSelector((state) => state.player.username);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userNameChangeHandler = (event: any) => {
    dispatch(setUserName(event.target.value));
  };

  return (
    <ChakraProvider>
      <div className='app'>
        {gameIsActive ? (
          <Game />
        ) : (
          <div className='app__input-area'>
            <Input
              value={username}
              onChange={userNameChangeHandler}
              variant='outline'
              size='lg'
              _placeholder={{ opacity: .5, color: 'gray.300' }}
              color='white'
              placeholder='Enter a username'
            />
            <Button
              className='app__start-button'
              color='green.500'
              isDisabled={username.length > 0 ? false : true}
              size='lg'
              onClick={() => dispatch(startGame())}
            >
              <FontAwesomeIcon icon={faPlay} />
              <Text marginLeft={4}>Play Game</Text>
            </Button>
          </div>
        )}
        {(!gameIsActive && previousGameWinner) && <GameModal /> }
      </div>
    </ChakraProvider>
  );
};

export default App;
