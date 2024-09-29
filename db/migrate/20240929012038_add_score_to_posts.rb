class AddScoreToPosts < ActiveRecord::Migration[7.2]
  def change
    add_column :posts, :score, :integer
  end
end
