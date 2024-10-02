# frozen_string_literal: true

class NestedCommentsService


  def perform(post:, levels: )
    comments = Comment.where(post: post).to_a

    @by_id = {}
    @top_level_comments = []
    comments.each do |comment|
      by_id[comment.id] = comment
      top_level_comments << comment if comment.top_level?
    end

    @nested = []
    top_level_comments.sort_by{|c| -1 * c.score}.each do |comment|
      @nested << nest(comment)
    end
    @nested
  end

  private

  def nest(comment)
    nested = {
      body: comment.body,
      author: comment.author,
      replies: []
    }

    comment.replies.each do |reply|
      nested[:replies] << nest(reply)
    end

    nested.delete(:replies) if nested[:replies].empty?
    nested
  end

  attr_accessor :top_level_comments, :by_id, :nested
end