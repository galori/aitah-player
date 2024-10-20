class TextUtil
  def self.find_sentences(_text)
    text = _text.dup
    text.gsub!(/\.{2,}/, '.') # change eclipses to one period

    regex = /(?<!\b\p{L})\.(?!\w\b|$)/

    text.gsub!(regex, '[SPLIT]') # change dots in sentences to [SPLIT] but not in acronyms
    text.gsub!(/\.$/, '') # remove trailing dot
    text
  end
end