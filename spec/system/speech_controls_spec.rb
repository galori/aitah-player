require 'rails_helper'

RSpec.describe 'speech controls', js: true, vcr: { record: :once } do
  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchPostsService.new(limit: 3, comment_limit: 3).perform
  end

  it 'speaks the post title' do
    visit '/'
    click_on_text 'AITA for calling my parents selfish for having me'
    expect(page).to have_text "Edit: most of you figured it out anyway.", wait: 5
    click_on 'Play'
    click_on 'Pause'
    speech_calls = page.evaluate_script('window.SpeechMock.getCalls("speak");')

    # expect(speech_calls) to be an array that includes a string matching the post title
    expect(speech_calls).to include a_string_matching(/AITA for calling my parents selfish for having me/i)
  end
end
