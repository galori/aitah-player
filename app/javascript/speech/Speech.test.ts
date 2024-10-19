describe('Speech', () => {
  describe('.init()', () => {
    const initSpy = jest.fn();
    beforeEach(() => {
      jest.mock('easy-speech', () => {
        return {init: initSpy}
      });
    });
    it('should call EasySpeech.init()', async () => {
      const Speech = require('./Speech').default;
      await Speech.init();
      expect(initSpy).toHaveBeenCalled();
    });
  });
  describe('.speak()', () => {
    beforeEach(() => {
      jest.mock('easy-speech', () => {
        return {speak: jest.fn()}
      });
    });
    it('should call EasySpeech.speak()', async () => {
      const Speech = require('./Speech').default;
      const voice = {lang: 'en-US', voiceURI: 'test', name: 'test', default: true, localService: true};
      await Speech.speak({text: 'Hello', voice});
      const easySpeech = require('easy-speech');
      expect(easySpeech.speak).toHaveBeenCalledWith({text: 'Hello', voice});
    });
  });
});