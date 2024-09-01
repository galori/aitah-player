class Post < ApplicationRecord
  include Presentable

  has_many :comments, dependent: :destroy
end
