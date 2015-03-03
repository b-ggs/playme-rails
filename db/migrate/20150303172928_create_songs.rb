class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :user_id
      t.integer :playlist_id
      t.integer :queue_id
      t.string :filename
      t.string :title
      t.string :artist
      t.string :album

      t.timestamps null: false
    end
  end
end
