class Song < ActiveRecord::Base
	belongs_to :playlist

	def self.new_song(user_id, playlist_id, filename, title, artist, album)
		return false if Song.where(filename: filename).to_a.size > 0
		return false if playlist_id == nil

		new_song = Song.create(user_id: user_id, playlist_id: playlist_id, queue_id: 0, filename: filename, title: title, artist: artist, album: album)
		new_song
	end
end