class FetchCommentsService
  def initialize(post:, limit: nil)
    @post = post
    @comments_count = 0
    @limit = limit || 5
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
      break if @comments_count >= @limit
      next if comment['kind'] == 'more'
      body = comment['data']['body']
      author = comment['data']['author']
      score = comment['data']['score']
      @comments_count += 1
      new_comment = Comment.create!(body: body, author: author, post: post, parent: parent, score: score)
      replies = comment.dig('data','replies')
      if replies.present?
        reply_comments = replies.dig('data','children')
        add_comments(reply_comments, new_comment) if comments.present?
      end
    end
  end

  attr_reader :post, :comments_count, :limit
end