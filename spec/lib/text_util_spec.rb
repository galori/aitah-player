# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TextUtil do
  describe '#find_sentences' do
    it 'changes dots in sentences to [SPLIT] but not in acronyms' do
      text = "I love this site a.m. and F.B.I for sure. But I don't like this site. Hi dude."
      expect(TextUtil.find_sentences(text)).to eq("I love this site a.m. and F.B.I for sure[SPLIT] But I don't like this site[SPLIT] Hi dude")
    end

    it 'changes eclipses to one period' do
      text = "I like ice cream.... I like cake."
      expect(TextUtil.find_sentences(text)).to eq("I like ice cream[SPLIT] I like cake")
    end
  end
end
