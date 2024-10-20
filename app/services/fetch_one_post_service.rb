class FetchOnePostService
  def initialize(subreddit, reddit_post_id)
    @reddit_post_id = reddit_post_id
    @subreddit = subreddit
  end

  def perform
    url = "https://www.reddit.com/r/#{@subreddit}/comments/#{@reddit_post_id}.json"
    response = RestClient.get(url)
    json = JSON.parse(response.body)

    body = JsonPointer.new(json, '/0/data/children/0/data/selftext').value
    title = JsonPointer.new(json, '/0/data/children/0/data/title').value
    author = JsonPointer.new(json, '/0/data/children/0/data/author').value
    url = JsonPointer.new(json, '/0/data/children/0/data/url').value
    score = JsonPointer.new(json, '/0/data/children/0/data/score').value

    post = Post.create(title: title, body: body, author: author, url: url, score: score)

    begin
      FetchCommentsService.new(post: post).perform
    rescue URI::InvalidURIError => e
      Rails.logger.info(e, "Invalid URI for post: #{post.id}")
    end
  end

  private

  attr_reader :reddit_post_id
end