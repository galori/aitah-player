class RenameCommentUpvotesToScore < ActiveRecord::Migration[7.2]
  def change
    rename_column :comments, :upvotes, :score
  end
end
