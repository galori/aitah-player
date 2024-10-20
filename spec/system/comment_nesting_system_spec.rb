require 'rails_helper'

RSpec.describe 'Comment Nesting System Spec', js: true, vcr: { record: :none, cassette_name: 'FetchCommentsService/downloads_comments_for_a_reddit_post' } do
  let(:post) { Post.create(
    title: 'AITAH for laughing in my SILs face when she DNA',
    body: 'AITAH for laughing in my SILs face when she DNA',
    author: 'u/throwaway',
    url: 'https://www.reddit.com/r/AITAH/comments/1fu4aoo/aitah_parents_at_school_edition/')
  }

  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    FetchCommentsService.new(post: post).perform
  end

  it 'displays the nested comments in the correct order' do
    visit '/'
    click_on_text('AITAH for laughing in my SILs face when she DNA')
    sleep 1

    within_comment(0) do |comment|
      expect(comment).to have_text('I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you.')
    end
    within_comment(1) do |comment|
      expect(comment).to have_text("You are right, they don't like me, but that part I could care less about.")
    end
    within_comment(2) do |comment|
      expect(comment).to have_text("Yeah, but you need to care because you need them to work with you.")
    end
    within_comment(3) do |comment|
      expect(comment).to have_text(/Everyone Sucks.*My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays/)
    end
    within_comment(4) do |comment|
      expect(comment).to have_text("Power plays!!! Yes, that's it exactly.")
    end
  end

end

