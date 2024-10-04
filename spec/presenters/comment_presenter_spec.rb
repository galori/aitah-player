# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentPresenter do

  context 'sentences' do
    it 'breaks up the body into sentences' do
      comment = build(:comment, body: 'This is a comment. This is another comment.')
      presenter = CommentPresenter.new(comment)
      expect(presenter.sentences).to eq(['This is a comment', 'This is another comment'])
    end
  end
end
