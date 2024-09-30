# frozen_string_literal: true

module Api
  class CommentsController < ApplicationController
    def index
      @post = Post.find(params[:post_id])
      render json: @post.comments.to_json
    end
  end
end