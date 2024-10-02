# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FetchCommentsService, vcr: { record: :none, cassette_name: 'FetchCommentsService/downloads_comments_for_a_reddit_post' } do
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

  it 'downloads comments for a reddit post' do
    comment = Comment.first
    expect(comment.body).to eq('NTA - she wanted to stir some shit up, that’s a hell of a lot of effort to “help”. Also I’d be pissed about how she got Lilys DNA to do this? It didn’t go the way she thought it would so she got mad, your brother is just trying to side with his soon to be wife')
  end

  it 'downloads the first page of commments' do
    expect(Comment.count).to eq(6)
  end

  context 'top comments' do
    it 'has 3 top comments' do
      expect(post.comments.top).to eq(3)
    end

    it 'downloads the top 3 comments' do
      top_comments = post.comments.top
      puts top_comments.map(&:body).inspect
      expect(top_comments.map(&:body)).to eq([
                                               "I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you.  And you’re not helping yourself out by doing things like removing editing access from spreadsheets.  I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down. Where are all the other PTO board members? Why aren’t they involved in this?",
                                               "NTA.  Sounds like you have your hands full.",
                                               "Everyone Sucks. My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays."
                                             ])
    end

    it 'fetches 3 levels of nested comments' do
      nested = NestedCommentsService.new.perform(post: post, levels: 3)
      expect(nested).to eq([
                             {
                               body: "I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you.  And you’re not helping yourself out by doing things like removing editing access from spreadsheets.  I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down. Where are all the other PTO board members? Why aren’t they involved in this?",
                               author: 'HunterandGatherer100',
                               replies: [
                                 {
                                   body: "You are right, they don't like me, but that part I could care less about. We still need to work together and be respectful. We have had 3 planning meetings. Each time I walk away thinking we are all on the same page. Then, more shit happens. \nAs for removing editing access, it is my spreadsheet, and I'm the one inputting all volunteers based on their survey responses. So when someone comes in and changes things it really effs it up, ya know?  Imagine scheduling 65 people over 6 shifts in 20 positions. It is tedious. \nThis is a sub committee of the board so other members not involved.",
                                   author: 'das-wunderland',
                                   replies: [
                                     {
                                       body: "Yeah, but you need to care because you need them to work with you.  I’m not saying you have to be best friends with these people, but in order for you to do your job they need to communicate with you and they’ve cut off communication.  Remember, you’re all there for the children not yourselves.  \n\nI still would have another meeting. This time I would take meeting notes and I would make sure after the meeting was over that I emailed the meeting notes to everybody that was there confirming the plans.",
                                       author: 'HunterandGatherer100',
                                     }
                                   ]
                                 }
                               ]
                             },
                             {
                               author: 'Asaneth',
                               body: "NTA.  Sounds like you have your hands full.",
                             },
                             {
                               body: "Everyone Sucks. My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays.",
                               author: 'foolish-heart-s2',
                               replies: [
                                 {
                                   body: "Power plays!!! Yes, that's it exactly.",
                                   author: 'das-wunderland',
                                 }
                               ]
                             }
                           ])
    end

  end

  it 'downloads child comments' do
    top_comments = post.comments.where(parent_id: nil).order(score: :desc).first
    expect(top_comments.replies.length).to eq(1)
    expect(top_comments.replies.first.body).to include("In 2009 a Yale graduate student")
  end

  it 'does not create empty comments' do
    expect(Comment.where(body: nil).count).to eq(0)
  end

end
