/* eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }] */
type Callback = (...args: any[]) => void;

type GlobalWindow = Window &
  typeof globalThis & {
    webkitSpeechRecognition: ISpeechRecognition;
    SpeechRecognition: ISpeechRecognition;
    webkitSpeechGrammarList?: ISpeechGrammarList;
    SpeechGrammarList?: ISpeechGrammarList;
  };

declare let webkitSpeechRecognition: ISpeechRecognition;
declare let SpeechRecognition: ISpeechRecognition;
declare let webkitSpeechGrammarList: ISpeechGrammarList;
declare let SpeechGrammarList: ISpeechGrammarList;
