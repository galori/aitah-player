class Comment < ApplicationRecord
  include Presentable


  belongs_to :post
  has_many :replies, class_name: 'Comment', foreign_key: 'parent_id', dependent: :destroy
  belongs_to :parent, class_name: 'Comment', foreign_key: 'parent_id', optional: true
  scope :by_score, -> { order(score: :desc) }
  scope :top_level, -> { where(parent_id: nil) }


  def top_level?
    parent_id.nil?
  end

  def to_json
    {a:1}
  end
  def as_json
    {a:1}
  end
end