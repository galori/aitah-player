# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FetchCommentsService, vcr: { record: :none, cassette_name: 'FetchCommentsService/downloads_comments_for_a_reddit_post' } do
  let(:post) { Post.create(
    title: 'AITAH for laughing in my SILs face when she DNA',
    body: 'AITAH for laughing in my SILs face when she DNA',
    author: 'u/throwaway',
    url: 'https://www.reddit.com/r/AITAH/comments/1fu4aoo/aitah_parents_at_school_edition/')
  }

  describe 'fetching without a comment limit' do
    before do
      fast_retry = Retry.new(overall_multiplier: 0)
      allow(Retry).to receive(:new).and_return(fast_retry)
      FetchCommentsService.new(post: post, limit: 100).perform
    end

    it 'downloads all comments' do
      expect(Comment.count).to eq(6)
    end

    context 'top level comments' do
      it 'has 3 top comments' do
        expect(post.comments.top_level.count).to eq(3)
      end

      it 'downloads the top 3 comments' do
        top_comments = post.comments.top_level.by_score
        expected_comments = [
          "I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you.  And you’re not helping yourself out by doing things like removing editing access from spreadsheets.  I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down. Where are all the other PTO board members? Why aren’t they involved in this?",
          "NTA.  Sounds like you have your hands full.",
          "Everyone Sucks. My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays."
        ]
        expect(top_comments.map(&:body)).to eq(expected_comments)
      end
    end

    it 'correctly persists the comment nesting' do
      top_comment = post.comments.top_level.by_score.first
      expect(top_comment.body).to include("I don’t know a nice way to say this")

      top_reply_to_top_comment = top_comment.replies.by_score.first
      expect(top_reply_to_top_comment.body).to include("You are right, they don't like me")

      top_reply_to_top_reply = top_reply_to_top_comment.replies.by_score.first
      expect(top_reply_to_top_reply.body).to include('Yeah, but you need to care because you need them to work with you')
    end

    it 'does not create empty comments' do
      expect(Comment.where(body: nil).count).to eq(0)
    end
  end
  describe 'limiting the # of comments fetched' do
    it 'supports limiting comments' do
      FetchCommentsService.new(post: post, limit: 3).perform
      expect(post.reload.comments.count).to eq(3)
    end
    it 'defaults when to 5 when no limit is provided' do
      FetchCommentsService.new(post: post, limit: nil).perform
      expect(post.reload.comments.count).to eq(5)
    end
  end
end
