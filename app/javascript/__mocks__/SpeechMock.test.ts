import SpeechMock from './SpeechMock';
import {Voice} from "../types";

describe('SpeechMock', () => {
  it('should be count the number of calls', async () => {
    await SpeechMock.init();

    const voice:Voice = {lang: 'en-US', voiceURI: 'test', name: 'test', default: true, localService: true};
    await SpeechMock.speak({text: 'Hello', voice: voice});

    const calls = SpeechMock.getCalls();
    expect(calls.length).toBe(1);
    expect(calls[0]).toBe('Hello');
  });
});