class FetchCommentsService
  def initialize(post)
    @post = post
  end

  def perform
    uri = URI(@post.url)
    uri.path.gsub!(/\/$/,'.json')
    begin
      response = RestClient.get(uri.to_s)
    rescue => e
      if e == RestClient::TooManyRequests
        puts e.body
        puts e.body
      end
    end

    begin
      json = JSON.parse(response.body)
      json[1]['data']['children'].each do |comment|
        post.comments.create!(body: comment['data']['body'], author: comment['data']['author'])
      end
    rescue  => e
      puts e
    end
    # => "NTA - she wanted to stir some shit up, that’s a hell of a lot of effort to “help”. Also I’d be pissed about how she got Lilys DNA to do this? It didn’t go the way she thought it would so she got mad, your brother is just trying to side with his soon to be wife"

  end

  private

  attr_reader :post
end