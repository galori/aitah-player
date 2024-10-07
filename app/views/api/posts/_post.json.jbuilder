json.extract! post, :id, :author, :title, :sentences, :score
json.url post_url(post, format: :json)
