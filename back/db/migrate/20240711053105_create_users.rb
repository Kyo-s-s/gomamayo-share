class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :password_digest

      t.timestamps
    end

    add_index :users, :name, unique: true
  end
end
