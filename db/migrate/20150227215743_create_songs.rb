class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :playlist_id
      t.string :filename
      t.string :title
      t.string :artist

      t.timestamps null: false
    end
  end
end
