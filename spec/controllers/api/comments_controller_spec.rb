# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CommentsController do

  describe '#index' do
    let!(:post) { create(:post) }
    let!(:comments) { create(:comment, body: 'I agree', post: post) }
    it 'returns the comments for a post' do
      get :index, params: { post_id: post.id }, format: :json
      json = JSON.parse(response.body)
      expect(json[0]['body']).to eq('I agree')
    end

  end
end