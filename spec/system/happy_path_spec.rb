require 'rails_helper'

RSpec.describe 'happy path', js: true, vcr: {  record: :new_episodes } do
  before do
    FetchPostsService.new.perform
  end
  it 'reads comments' do
    visit '/'
    expect(page).to have_content('AITAH')
    expect(page).to have content('some comment')
  end
end