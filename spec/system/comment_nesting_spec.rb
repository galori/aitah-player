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
    click_on_text('AITAH for laughing in my SILs face when she DNA')
    sleep 1
    within_comment(0) do |comment|
      expect(comment).to have_content('I don’t know a nice way to say this, but these people don’t like you that’s why they’re going around you.  And you’re not helping yourself out by doing things like removing editing access from spreadsheets.  I would probably just send a group email not a single text to one person that you would like to do a planning meeting in person to work out all of the details so that you can all be heard and get the event details down. Where are all the other PTO board members? Why aren’t they involved in this?')
    end
    within 'div[data-comment-index=1]' do
      expect(page).to have_content("You are right, they don't like me, but that part I could care less about. We still need to work together and be respectful. We have had 3 planning meetings. Each time I walk away thinking we are all on the same page. Then, more shit happens. \nAs for removing editing access, it is my spreadsheet, and I'm the one inputting all volunteers based on their survey responses. So when someone comes in and changes things it really effs it up, ya know?  Imagine scheduling 65 people over 6 shifts in 20 positions. It is tedious. \nThis is a sub committee of the board so other members not involved.")
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

  def within_comment(comment_index)
    selector = "div[data-comment-index='#{comment_index}']"
    puts "selector=#{selector}"
    within selector do
      yield page
    end
  end
  def click_on_text(text)
    element = find_by_text(text)
    element.click
  end

  def find_by_text(text, wait: 1)
    xpath = "//*[contains(text(), '#{text}')]"
    node = find(:xpath, xpath)
    node
  end

end

