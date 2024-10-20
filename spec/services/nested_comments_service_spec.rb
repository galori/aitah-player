# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NestedCommentsService, vcr: { record: :none, cassette_name: 'FetchCommentsService/downloads_comments_for_a_reddit_post' } do
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

  it 'fetches 3 levels of nested comments' do
    nested = NestedCommentsService.new.perform(post: post, levels: 3)
    expected = [
      {
        "sentences": [
          "I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you",
          "And you’re not helping yourself out by doing things like removing editing access from spreadsheets",
          "I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down",
          "Where are all the other PTO board members? Why aren’t they involved in this?"
        ],
        "author": "HunterandGatherer100",
        "score": 3,
        "replies": [
          {
            "sentences": [
              "You are right, they don't like me, but that part I could care less about",
              "We still need to work together and be respectful",
              "We have had 3 planning meetings",
              "Each time I walk away thinking we are all on the same page",
              "Then, more shit happens",
              "As for removing editing access, it is my spreadsheet, and I'm the one inputting all volunteers based on their survey responses",
              "So when someone comes in and changes things it really effs it up, ya know?  Imagine scheduling 65 people over 6 shifts in 20 positions",
              "It is tedious",
              "This is a sub committee of the board so other members not involved"
            ],
            "author": "das-wunderland",
            "score": 4,
            "replies": [
              {
                "sentences": [
                  "Yeah, but you need to care because you need them to work with you",
                  "I’m not saying you have to be best friends with these people, but in order for you to do your job they need to communicate with you and they’ve cut off communication",
                  "Remember, you’re all there for the children not yourselves",
                  "I still would have another meeting",
                  "This time I would take meeting notes and I would make sure after the meeting was over that I emailed the meeting notes to everybody that was there confirming the plans"
                ],
                "author": "HunterandGatherer100",
                "score": 2
              }
            ]
          }
        ]
      },
      {
        "sentences": [
          "Everyone Sucks",
          "My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays"
        ],
        "author": "foolish-heart-s2",
        "score": 1,
        "replies": [
          {
            "sentences": [
              "Power plays!!! Yes, that's it exactly"
            ],
            "author": "das-wunderland",
            "score": 1
          }
        ]
      }
    ]

    expect(nested).to eq(expected)
  end

  it 'fetches 2 levels of nested comments' do
    nested = NestedCommentsService.new.perform(post: post, levels: 2)
    expected = [
      {
        "sentences": [
          "I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you",
          "And you’re not helping yourself out by doing things like removing editing access from spreadsheets",
          "I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down",
          "Where are all the other PTO board members? Why aren’t they involved in this?"
        ],
        "author": "HunterandGatherer100",
        "score": 3,
        "replies": [
          {
            "sentences": [
              "You are right, they don't like me, but that part I could care less about",
              "We still need to work together and be respectful",
              "We have had 3 planning meetings",
              "Each time I walk away thinking we are all on the same page",
              "Then, more shit happens",
              "As for removing editing access, it is my spreadsheet, and I'm the one inputting all volunteers based on their survey responses",
              "So when someone comes in and changes things it really effs it up, ya know?  Imagine scheduling 65 people over 6 shifts in 20 positions",
              "It is tedious",
              "This is a sub committee of the board so other members not involved"
            ],
            "author": "das-wunderland",
            "score": 4
          }
        ]
      },
      {
        "sentences": [
          "Everyone Sucks",
          "My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays"
        ],
        "author": "foolish-heart-s2",
        "score": 1,
        "replies": [
          {
            "sentences": [
              "Power plays!!! Yes, that's it exactly"
            ],
            "author": "das-wunderland",
            "score": 1
          }
        ]
      }
    ]

    expect(nested).to eq(expected)
  end

  it 'fetches 1 level of nested comments' do
    nested = NestedCommentsService.new.perform(post: post, levels: 1)
    expected = [
      {
        "sentences": [
          "I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you",
          "And you’re not helping yourself out by doing things like removing editing access from spreadsheets",
          "I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down",
          "Where are all the other PTO board members? Why aren’t they involved in this?"
        ],
        "author": "HunterandGatherer100",
        "score": 3
      },
      {
        "sentences": [
          "Everyone Sucks",
          "My worst nightmares are parents getting caught over petty issues and tripping over each other with the tiny power plays"
        ],
        "author": "foolish-heart-s2",
        "score": 1
      }
    ]

    expect(nested).to eq(expected)
  end
end
