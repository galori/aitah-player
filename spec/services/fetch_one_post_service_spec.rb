# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FetchOnePostService, vcr: { record: :once, cassette_name: 'FetchOnePostService/fetch_one_post'} do

  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    fetch_comments_service = instance_double('FetchCommentsService', perform: nil)
    allow(FetchCommentsService).to receive(:new).and_return(fetch_comments_service)

    FetchOnePostService.new('aitah', '1g1m2eo').perform
  end

  it 'Fetches the post attributes' do
    post = Post.first
    expect(post.title).to eq("AITA for refusing to help my boyfriend move back home after he lost his job?")
    expect(post.body).to include("I (26F) have been dating my boyfriend, Tom (28M)")
    expect(post.score).to eq(60)
    expect(post.author).to eq("Particular_Lime_5478")
    expect(post.url).to eq("https://www.reddit.com/r/AITAH/comments/1g1m2eo/aita_for_refusing_to_help_my_boyfriend_move_back/")
  end
end
