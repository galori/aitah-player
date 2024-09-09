module Api
  class PostsController < ApplicationController
    def index
      @posts = Post.decorate(Post.all)
    end

    def show
      post = Post.find(params[:id]).decorate
      @post = PostPresenter.new(post)
    end
  end
end