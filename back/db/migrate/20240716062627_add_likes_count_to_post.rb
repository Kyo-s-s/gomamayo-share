class AddLikesCountToPost < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :likes_count, :integer, default: 0
  end
end
