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
    comments.each do |comment|
      body = comment['data']['body']
      author = comment['data']['author']
      post.comments.create!(body: body, author: author)
    end

    # comments.each_with_index do |comment, i| post.comments.create!(body: comment['data']['body'], author: comment['data']['author'])
    # end

    # json[1]['data']['children'].each_with_index do |comment, i| puts "comment #{i}"
    # end
  end

  private

  attr_reader :post
end