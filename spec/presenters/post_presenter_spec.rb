require 'rails_helper'

RSpec.describe PostPresenter do
  let(:post)  { create(:post, body: "Hello\nEveryone") }

  describe '#body_as_html' do
    it 'returns the body as HTML' do
      expect(described_class.new(post).body_as_html).to eq("<p>Hello<br>\nEveryone</p>\n")
    end
  end
end