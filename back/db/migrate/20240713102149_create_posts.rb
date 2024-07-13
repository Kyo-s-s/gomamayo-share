class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :posts, :content, unique: true
    add_index :posts, %i[user_id created_at]
  end
end
