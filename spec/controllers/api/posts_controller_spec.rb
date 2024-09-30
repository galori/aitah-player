# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::PostsController do
  describe '#index' do
    let!(:post) { create(:post, title: "AITAH? I ate the cereal")}
    render_views
    subject(:response_data) do
      get :index, format: :json
      JSON.parse(response.body)
    end

    it 'returns posts' do
      expect(response_data[0]['title']).to eq("AITAH? I ate the cereal")
    end
  end
end
