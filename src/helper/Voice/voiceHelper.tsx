import { setSpeechRecognition } from '../../store/voice';
import { useAppDispatch } from '../../store/hook';

// creates voice recognition object
const Voice = () => {
  const dispatch = useAppDispatch();

  const SpeechRecognition =
  (window as GlobalWindow).webkitSpeechRecognition ||
  (window as GlobalWindow).SpeechRecognition;
  const recognition: ISpeechRecognition = new SpeechRecognition();
  recognition.lang = 'tr-TR';


  dispatch(setSpeechRecognition(recognition));

  return null;

};

export default Voice;
