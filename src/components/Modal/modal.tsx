import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { resetTime } from '../../store/time';
import { startGame } from '../../store/game';
import { setComputerTurn } from '../../store/player';
import { resetWords } from '../../store/words';
import Users from '../../enums/users';
import Results from '../../constants/gameResults';
import './modal.scss';

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Modal,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';

// shows result of the game.
const GameModal = () => {
  const [open, setOpen] = useState<boolean>(true);

  const words = useAppSelector((state) => state.words.words);
  const previousGameWinner = useAppSelector((state) => state.game.previousGameWinner);
  const reasonOfLose = useAppSelector((state) => state.game.reasonOfLose);
  const dispatch = useAppDispatch();

  const onClose = () => {
    setOpen(false);
    dispatch(resetWords());
    dispatch(resetTime());
    dispatch(startGame());
    dispatch(setComputerTurn());
  };

  const listWords = words.map((word, index) => (
    <ListItem fontSize={14} key={index}>
      {word}
    </ListItem>
  ));

  return (
    <>
      <Modal
        isCentered
        isOpen={open}
        onClose={onClose}
        size={'2xl'}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg='none' backdropFilter='auto' backdropInvert='30%' backdropBlur='2px' />
        <ModalContent className='modal-body'>
          {previousGameWinner === Users.COMPUTER ? (
            <>
              <ModalHeader className='modal-body__title' fontSize={36} color='red.500'>
                Game Over
              </ModalHeader>
              <ModalHeader fontSize={12} color='gray.400' paddingTop={0}>
                You lost the game! {reasonOfLose}
              </ModalHeader>
            </>
          ) : (
            <>
              <ModalHeader className='modal-body__title' fontSize={36} color='green.500'>
                Congratulations
              </ModalHeader>
              <ModalHeader fontSize={14} color='gray.400' paddingTop={0}>
                You won the game!
              </ModalHeader>
            </>
          )}
          <ModalHeader fontSize={18}>Words</ModalHeader>
          <ModalBody className='modal-body__body'>
            <OrderedList
              className={
                previousGameWinner === Users.COMPUTER && reasonOfLose === Results.INVALID_WORD
                  ? 'modal-body--error-text'
                  : undefined
              }
            >
              {listWords}
            </OrderedList>
          </ModalBody>
          <ModalFooter>
            <Button className='font' border='2px' borderColor='green.500' onClick={onClose}>
              Play Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default GameModal;
