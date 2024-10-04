# frozen_string_literal: true

class NestedCommentsService


  def perform(post:, levels: )
    @levels = levels
    comments = Comment.decorate(Comment.where(post: post)).to_a

    @by_id = {}
    @top_level_comments = []
    comments.each do |comment|
      by_id[comment.id] = comment
      top_level_comments << comment if comment.top_level?
    end

    @nested = []
    top_level_comments.sort_by{|c| -1 * c.score}.each do |comment|
      @nested << nest(comment, 1)
    end
    @nested
  end

  private

  def nest(comment, level)
    return if level > @levels

    nested = {
      sentences: comment.sentences,
      author: comment.author,
      score: comment.score,
      replies: []
    }

    Comment.decorate(comment.replies).each do |reply|
      nested[:replies] << nest(reply, level+1)
    end

    nested.delete(:replies) if nested[:replies].compact.empty?
    nested
  end

  attr_accessor :top_level_comments, :by_id, :nested, :levels
end