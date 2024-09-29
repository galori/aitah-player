require 'rails_helper'

RSpec.describe FetchPostsService, vcr: { record: :none, cassette_name: 'FetchPostsService/download_posts' } do
  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)
    fetch_comments_service = instance_double('FetchCommentsService', perform: nil)
    allow(FetchCommentsService).to receive(:new).and_return(fetch_comments_service)

    FetchPostsService.new.perform
  end

  let(:post) { Post.order(score: :desc).first }


  it 'downloads 25 posts' do
    expect(Post.count).to eq(25)
  end

  it 'sets the title' do
    expect(post.title).to eq("I took a shower at midnight while my wife was watching TV. Who’s the AH?")
  end

  it 'sets the body' do
    expect(post.body).to include('My wife was sitting in the recliner watching her iPad right outride the kids bedrooms.')
  end

  it 'sets the score' do
    expect(post.score).to eq(20713)
  end
end