import { render, screen, act } from '@testing-library/react';
import VoiceSelector from './VoiceSelector';
import EasySpeech from 'easy-speech';

describe('VoiceSelector', () => {
  it('renders a list of voices', async () => {
    jest.spyOn(EasySpeech, 'init').mockResolvedValue(true);
    jest.spyOn(EasySpeech, 'filterVoices').mockResolvedValue([{lang: 'en-US'}, {lang: 'en-GB'}, {lang: 'en-AU'}]);

    const { container } = render(<VoiceSelector />);

    // Check that loading text appears first
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText('en-US');

    expect(screen.getByText('en-US')).toBeInTheDocument();
    expect(screen.getByText('en-GB')).toBeInTheDocument();
    expect(screen.getByText('en-AU')).toBeInTheDocument();

  });
});

