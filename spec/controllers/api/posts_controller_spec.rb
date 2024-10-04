# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::PostsController do
  describe '#index' do
    let!(:post) { create(:post, title: "AITAH? I ate the cereal", author: "joe")}
    render_views
    subject(:response_data) do
      get :index, format: :json
      JSON.parse(response.body)
    end

    it 'returns posts' do
      expect(response_data[0]).to include({"author" => "joe", "title" => "AITAH? I ate the cereal", "sentences" => ["Hello everyone First off i wanna say i’m high on emotion and drunk while typing this so excuse any writing mistakes", " Also i wanna thank everyone that has supported me and sent me nice messages Now on the update After seeing a lot of advice i decided to meet up with my wife in a cafe today My best friend and his wife were there as well just incase she tried to pull anything", " I’m just gonna keep it short she tried apologizing and i just didn’t wanna hear it "]})
    end
  end
end
