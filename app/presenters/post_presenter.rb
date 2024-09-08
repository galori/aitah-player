class PostPresenter < SimpleDelegator

  def body_segments_as_html
    renderer = Redcarpet::Render::HTML.new(no_links: true, hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    body_as_speech_segments.map do |segment|
      markdown.render(segment).html_safe
    end
  end

  def body_as_speech_segments
    body.scan(/[^\.]+\.?/).map(&:strip)
  end
  alias_method :sentences, :body_as_speech_segments

  def as_json
    {
      id: id,
      title: title,
      sentences: sentences,
      author: author
    }
  end
end