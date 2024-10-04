# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CommentsController do
  describe '#index' do
    let!(:post) { create(:post) }
    let!(:comment) { create(:comment, body: 'I agree. Good day.', post: post, score: 1, author: 'joe') }
    let!(:reply) { create(:comment, body: 'Hi', post: post, parent: comment, score: 2, author: 'jane') }
    it 'returns the comments for a post' do
      get :index, params: { post_id: post.id }, format: :json
      json = JSON.parse(response.body)
      expect(json).to match([{ 'sentences' => ['I agree', 'Good day'], "score" => 1, "author" => 'joe',
                            "replies" => [{ "sentences" => ['Hi'], "score" => 2, "author" => 'jane' }] }])
    end
  end
end
