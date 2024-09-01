class CreateComment < ActiveRecord::Migration[8.0]
  def change
    create_table :comments do |t|
      t.string :comment
      t.text :body
      t.text :author
      t.timestamp :posted_at
      t.integer :upvotes
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
