class FetchCommentsService
  def initialize(post)
    @post = post
  end

  def perform
    uri = URI(@post.url)
    uri.path.gsub!(/\/$/, '.json')
    response = Retry.new.backoff do
      RestClient.get(uri.to_s)
    end

    json = JSON.parse(response.body)
    comments = json[1]['data']['children']
    add_comments(comments)
  end

  private

  def add_comments(comments, parent = nil)
    comments.each do |comment|
      comment_data =
      body = comment['data']['body']
      author = comment['data']['author']
      score = comment['data']['score']
      new_comment = Comment.create!(body: body, author: author, post: post, parent: parent, score: score)
      replies = comment.dig('data','replies')
      if replies.present?
        comments = replies.dig('data','children')
        add_comments(comments, new_comment) if comments.present?
      end
    end
  end

  attr_reader :post
end