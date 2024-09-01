class PostPresenter < SimpleDelegator

  def body_as_html
    renderer = Redcarpet::Render::HTML.new(no_links: true, hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(body).html_safe
  end
end