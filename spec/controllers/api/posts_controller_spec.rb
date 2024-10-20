# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::PostsController do
  describe '#index' do
    let!(:post) { create(:post, title: "AITAH? I ate the cereal", author: "joe", body: 'abc. def. ghi.') }
    render_views
    subject(:response_data) do
      get :index, format: :json
      JSON.parse(response.body)
    end

    it 'returns posts' do
      response = response_data[0]
      expect(response['author']).to eq('joe')
      expect(response['title']).to eq('AITAH? I ate the cereal')
      expect(response['sentences']).to eq(['abc', 'def', 'ghi'])
    end
  end
end
