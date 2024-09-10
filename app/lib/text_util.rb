class TextUtil
  def self.find_sentences(text)
    text.gsub(/(?<!\b\w)\.(?!\w\b|$)/, '[SPLIT]').gsub(/\.$/, '')
  end
end