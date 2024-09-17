import {render, screen, act, waitFor} from '@testing-library/react';
import VoiceSelector from './VoiceSelector';
import EasySpeech from 'easy-speech';
import '@testing-library/jest-dom';
import {MemoryRouter} from "react-router-dom";

describe('VoiceSelector', () => {
  it('renders a list of voices', async () => {
    const voiceData = [
      {lang: 'en-US', name: 'Barry'},
      {lang: 'en-GB', name: 'Fiona'},
      {lang: 'en-AU', name: 'Mia'}
    ]
    jest.spyOn(EasySpeech, 'init').mockResolvedValue(true);
    // @ts-ignore
    jest.spyOn(EasySpeech, 'filterVoices').mockResolvedValue(voiceData);

    const handleSetSelectedVoice = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <VoiceSelector setSelectedVoice={handleSetSelectedVoice} />
      </MemoryRouter>
    );
    console.log(`container.innerHTML: ${container.innerHTML}`);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('US')).toBeInTheDocument(), {timeout: 200000});

    screen.getByText('Barry').click();

    expect(handleSetSelectedVoice).toHaveBeenCalledWith('Barry');

    screen.getByText('GB').click();

    screen.getByText('Fiona').click();

    expect(handleSetSelectedVoice).toHaveBeenCalledWith('Fiona');

  }, 200000);
});

