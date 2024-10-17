class FetchPostsService
  def perform(limit: 25)
    response = RestClient.get("https://www.reddit.com/r/aitah/top.json?limit=#{limit}")
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
        FetchCommentsService.new(post).perform
      rescue URI::InvalidURIError => e
        Rails.logger.info("Invalid URI for post: #{post.id} #{e}")
      end

    end
    'done'
  end
end