module CapybaraHelpers
  def within_comment(comment_index)
    selector = "div[data-comment-index='#{comment_index}']"
    within selector do
      yield page
    end
  end

  def click_on_text(text)
    element = find_by_text(text)
    element.click
  end

  def find_by_text(text, wait: 1)
    escaped_text = text.gsub("'", %q(\\\'))
    xpath = "//*[contains(text(), \"#{escaped_text}\")]"
    node = find(:xpath, xpath)
    node
  end
end