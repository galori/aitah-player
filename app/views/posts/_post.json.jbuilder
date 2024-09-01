json.extract! post, :id, :author, :body, :title, :url, :created_at, :updated_at
json.url post_url(post, format: :json)
