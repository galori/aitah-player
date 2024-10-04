class CommentPresenter < SimpleDelegator

  def body_as_speech_segments
    clean_body = body

    # change urls in the body to the text "link_removed"
    clean_body.gsub!(/https?:\/\/[\S]+/, ' (link) ')

    clean_body = TextUtil.find_sentences(clean_body)

    clean_body.split('[SPLIT]').map(&:strip)
  end

  alias_method :sentences, :body_as_speech_segments

  def as_json
    {
      sentences: sentences,
      author: author,
      score: score
    }
  end
end