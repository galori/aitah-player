require 'rails_helper'

RSpec.describe 'controls', js: true, vcr: {  record: :once } do

  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchPostsService.new(limit: 2, comment_limit: 2).perform
  end

  it 'works' do
    visit '/'
    click_on_text "AITA for calling out my husband’s coworker at his corporate party for flirting with him right in front of me?"
    # make sure we're on the post page by looking for a comment
    expect(page).to have_text 'Sounds like many people at that table were being inappropriate'

    # On post 1
    expect(page).to have_text 'AITA for calling out my husband’s coworker at his corporate party for flirting with him right in front of me?'
    click_on 'Next Post'

    # on post 2
    expect(page).to have_text 'AITA For taking my kids back home with me, from my parents house after they violated; the one simple rule I gave them.', wait: 5
    click_on 'Next Post'

    # still on post 2
    expect(page).to have_text 'AITA For taking my kids back home with me, from my parents house after they violated; the one simple rule I gave them.', wait: 5
    click_on 'Previous Post'

    # on post 1
    expect(page).to have_text 'AITA for calling out my husband’s coworker at his corporate party for flirting with him right in front of me?'
    click_on 'Previous Post'

    # still on post 1
    expect(page).to have_text 'AITA for calling out my husband’s coworker at his corporate party for flirting with him right in front of me?'
    click_on 'Previous Post'
  end
end