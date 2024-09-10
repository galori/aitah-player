require 'rails_helper'

RSpec.describe PostPresenter do
  let(:post) { create(:post,
      body: "We have been together for\n8 months and official 4. I love him honestly and everything was great. We met each other’s family and friends and the whole thing.",
      author: 'u/throwawayAITA2020',
      title: "Update 1: AITAH for starting the divorce process after finding out my daughter isn’t mine"
  )}

  context '#body_sgements_as_html' do
    it 'returns the body as HTML' do
      expect(described_class.new(post).body_segments_as_html).to eq([
        "<p>We have been together for<br>\n8 months and official 4.</p>\n",
        "<p>I love him honestly and everything was great.</p>\n",
        "<p>We met each other’s family and friends and the whole thing.</p>\n"
      ])
    end
  end

  describe '#body_as_speech_segments' do
    it 'returns the body as speech segments' do
      expect(described_class.new(post).body_as_speech_segments).to eq([
          "We have been together for\n8 months and official 4.",
          "I love him honestly and everything was great.",
          "We met each other’s family and friends and the whole thing."
         ])
    end

    it 'strips URLs' do
      post = create(:post, body: "I love this site: https://www.reddit.com")
      expect(described_class.new(post).body_as_speech_segments).to eq([
        "I love this site: link_removed"
      ])
    end

    it 'changes acronyms separated by dots to acronyms separated by the word dot' do
      post = create(:post, body: "I love this site a.m. and F.B.I.")
      expect(described_class.new(post).body_as_speech_segments).to eq([
        "I love this site am and FBI"
      ])
    end
  end

  describe '#as_json' do
    it 'returns the post as JSON' do
      post_presenter = described_class.new(post)
      expect(post_presenter.as_json).to eq({
        id: post.id,
        title: "Update 1: AITAH for starting the divorce process after finding out my daughter isn’t mine",
        sentences: [
          "We have been together for\n8 months and official 4.",
          "I love him honestly and everything was great.",
          "We met each other’s family and friends and the whole thing."
        ],
        author: "u/throwawayAITA2020"
    })
    end
  end
end