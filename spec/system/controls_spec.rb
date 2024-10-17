require 'rails_helper'

RSpec.describe 'controls', js: true, vcr: {  record: :none } do

  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchPostsService.new.perform
  end

  it 'works' do
    visit '/'
    click_on_text("AITA for calling out my husband's coworker at his corporate party for flirting with him right in front of me?")
    within_comment(0) do |comment|
      expect(comment).to have_text('I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you.')
    end

  end
end