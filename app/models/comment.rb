class Comment < ApplicationRecord

  belongs_to :post
  has_many :replies, class_name: 'Comment', foreign_key: 'parent_id', dependent: :destroy
  belongs_to :parent, class_name: 'Comment', foreign_key: 'parent_id', optional: true
  scope :top, -> { where(parent_id: nil).order(score: :desc) }

  def top_level?
    parent_id.nil?
  end
end