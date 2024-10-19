require 'rails_helper'

RSpec.describe 'speech controls', js: true, vcr: { record: :once } do
  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchPostsService.new(limit: 3, comment_limit: 3).perform
  end

  it 'speaks the post title' do
    visit '/'
    # click_on_text "AITA for calling my parents selfish for having me, knowing they'd pass down a hereditary illness, and going LC after they hid it, putting my child at risk too?"
    click_on_text 'AITA for calling my parents selfish for having me'
    expect(page).to have_text "Edit: most of you figured it out anyway.", wait: 5
    click_on 'Play'
    speech_calls = page.evaluate_script('window.SpeechMock.getCalls();')

    expect(speech_calls).to include("AITA for calling my parents selfish for having me, knowing they'd pass down a hereditary illness, and going LC after they hid it, putting my child at risk too?")
  end
end
