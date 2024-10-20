# frozen_string_literal: true

class PostPresenter < SimpleDelegator

  def body_segments_as_html
    renderer = Redcarpet::Render::HTML.new(no_links: true, hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    body_as_speech_segments.map do |segment|
      markdown.render(segment).html_safe
    end
  end

  def body_as_speech_segments
    clean_body = body

    # change urls in the body to the text "link_removed"
    clean_body.gsub!(/https?:\/\/[\S]+/, ' (link) ')

    clean_body = TextUtil.find_sentences(clean_body)

    result = clean_body.split('[SPLIT]').map do |segment|
      segment.strip
    end
    result
  end

  alias_method :sentences, :body_as_speech_segments

  # the #show action is rendered by a .builder file
  def as_json
    {
      id: id,
      title: title,
      sentences: sentences,
      score: score,
      author: author
    }
  end
end