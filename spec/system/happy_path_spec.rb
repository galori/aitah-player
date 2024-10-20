require 'rails_helper'

RSpec.describe 'happy path', js: true, vcr: {  record: :none } do
  before do
    fast_retry = Retry.new(overall_multiplier: 0)
    allow(Retry).to receive(:new).and_return(fast_retry)

    FetchPostsService.new.perform
  end
  it 'reads comments' do
    visit '/'
    expect(page).to have_content('AITA for telling my brother in law he’s getting bald, after he told me I’m gaining weight?')
    click_on 'AITA for telling my brother in law he’s getting bald, after he told me I’m gaining weight?'
    expect(page).to have_content('Hugh is a bully, and I don’t like him.')
    expect(page).to have_content('But I want to know why your parents think it’s acceptable for a 30 year old man to bully a 16 year old child')
  end
end