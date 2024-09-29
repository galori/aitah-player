class Comment < ApplicationRecord

  belongs_to :post
  has_many :replies, class_name: 'Comment', foreign_key: 'parent_id'
  has_one :parent, class_name: 'Comment', foreign_key: 'parent_id'
end