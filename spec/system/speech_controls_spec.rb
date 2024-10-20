require 'rails_helper'

RSpec.describe 'speech controls', js: true, vcr: { record: :once } do

  Selenium
  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchPostsService.new(limit: 3, comment_limit: 3).perform
    visit '/'
    do_not_finish_speaking_immediately!
  end

  it 'speaks the post title' do
    click_on_text 'AITA for calling my parents selfish for having me'
    expect(page).to have_text "Edit: most of you figured it out anyway.", wait: 5
    click_on 'Play'

    finish_utterance

    expect("AITA for calling my parents selfish for having me").to have_been_spoken

    finish_utterance

    # sleep 2

    expect("Edit: most of you figured it out anyway").to have_been_spoken

  end

  def finish_speaking_immediately!
    page.execute_script('window.SpeechMock.finishSpeakingImmediately(true);')
  end

  def do_not_finish_speaking_immediately!
    page.execute_script('window.SpeechMock.finishSpeakingImmediately(false);')
  end

  RSpec::Matchers.define :have_been_spoken do |expected|
    match do |actual|
      @speech_calls = page.evaluate_script('window.SpeechMock.getCalls("speak");')
      expect(@speech_calls).to include a_string_including(actual)
    end
    failure_message do |actual|
      "Expected that #{actual} would be spoken. But only the following was spoken: #{@speech_calls}"
    end
    description do |actual|
      "speak the text #{actual}"
    end
  end

  def finish_utterance
    page.evaluate_async_script('const [callback] = arguments; window.SpeechMock.finishCurrentUtterance(callback); ')
  end
end
