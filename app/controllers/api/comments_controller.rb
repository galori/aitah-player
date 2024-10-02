# frozen_string_literal: true

module Api
  class CommentsController < ApplicationController
    def index
      @post = Post.find(params[:post_id])
      json = NestedCommentsService.new.perform(post: @post, levels: 3)
      render json: json
    end
  end
end