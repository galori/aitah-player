# froz

require 'rails_helper'

RSpec.describe FetchCommentsService, vcr: {record: :once} do
  let(:post) { Post.create(
    title: 'AITAH for laughing in my SILs face when she DNA',
    body: 'AITAH for laughing in my SILs face when she DNA',
    author: 'u/throwaway',
    url: 'https://www.reddit.com/r/AITAH/comments/1f3tcsd/aitah_for_laughing_in_my_sils_face_when_she_dna.json')
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
    expect(Comment.count).to eq(34)
  end

end
