interface ISpeechRecognition extends EventTarget {
  new (): ISpeechRecognition;
  lang: string;
  public start(): void;
  public stop(): void;
  public onresult(event: ISpeechRecognitionEvent): void;
}
interface ISpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
