class FetchPostsService
  def perform
    response = RestClient.get('https://www.reddit.com/r/aitah/top.json?limit=25')
    response['data']['children'].each do |child|
      data = child['data']
      post = Post.create(
        title: data['title'],
        body: data['selftext'],
        author: data['author'],
        url: data['url']
      )

      begin
        FetchCommentsService.new(post).perform
      rescue URI::InvalidURIError => e
        # do nothing
      end
    end
  end
end