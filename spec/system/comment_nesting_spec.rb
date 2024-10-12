require 'rails_helper'

RSpec.describe 'comment nesting', js: true, vcr: { record: :new_episodes, cassette_name: 'FetchCommentsService/downloads_comments_for_a_reddit_post' } do
  let(:post) { Post.create(
    title: 'AITAH for laughing in my SILs face when she DNA',
    body: 'AITAH for laughing in my SILs face when she DNA',
    author: 'u/throwaway',
    url: 'https://www.reddit.com/r/AITAH/comments/1fu4aoo/aitah_parents_at_school_edition/')
  }

  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchCommentsService.new(post).perform
  end

  it 'displays the nested comments in the correct order' do
    visit '/'
    click_on 'AITA for laughing in my SILs face when she DNA', wait: 60
    within '.sentence-1' do
      expect(page).to have_content('abc')
    end
    within '.sentence-2' do
      expect(page).to have_content('abc')
    end
    within '.sentence-2' do
      expect(page).to have_content('abc')
    end
    within '.sentence-3' do
      expect(page).to have_content('abc')
    end
    within '.sentence-4' do
      expect(page).to have_content('abc')
    end
  end
end