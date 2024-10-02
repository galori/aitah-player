# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CommentsController do
  describe '#index' do
    let!(:post) { create(:post) }
    let!(:comment) { create(:comment, body: 'I agree', post: post, score: 1, author: 'joe') }
    let!(:reply) { create(:comment, body: 'Hi', post: post, parent: comment, score: 2, author: 'jane') }
    it 'returns the comments for a post' do
      get :index, params: { post_id: post.id }, format: :json
      json = JSON.parse(response.body)
      expect(json).to match([{ 'body' => 'I agree', "score" => 1, "author" => 'joe',
                            "replies" => [{ "body" => 'Hi', "score" => 2, "author" => 'jane' }] }])
    end
  end
end
