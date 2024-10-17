class FetchPostsService

  def initialize(limit: 25, comment_limit: nil)
    @limit = limit
    @comment_limit = comment_limit
  end

  def perform
    response = RestClient.get("https://www.reddit.com/r/aitah/top.json?limit=#{@limit}")
    json = JSON::parse(response.body)
    json['data']['children'].each do |child|
      data = child['data']
      post = Post.create(
        title: data['title'],
        body: data['selftext'],
        author: data['author'],
        url: data['url'],
        score: data['score']
      )

      begin
        FetchCommentsService.new(post: post, limit: @comment_limit).perform
      rescue URI::InvalidURIError => e
        Rails.logger.info("Invalid URI for post: #{post.id} #{e}")
      end

    end
    'done'
  end

  private

  attr_reader :limit, :comment_limit

end