require 'rails_helper'

RSpec.describe 'happy path', js: true, vcr: {  record: :new_episodes } do
  before do
    FetchPostsService.new.perform
  end
  it 'reads comments' do
    visit '/'
    expect(page).to have_content('AITA for telling my brother in law he’s getting bald, after he told me I’m gaining weight?')
    click_on 'AITA for telling my brother in law he’s getting bald, after he told me I’m gaining weight?'
    expect(page).to have_content('Hugh is a bully, and I don’t like him.')
    expect(page).to have_content('Top comments')
  end
end