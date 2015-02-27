class Song < ActiveRecord::Base
	belongs_to :playlist

	def self.new_song(filename, title, artist)
		return false if Song.where(filename: filename).to_a.size > 0

		if Playlist.where(name: 'Unsorted').to_a.size == 0
			Playlist.new_playlist('Unsorted')
		end

		unsorted_id = Playlist.where(name: 'Unsorted').first.id

		new_song = Song.create(playlist_id: unsorted_id, filename: filename, title: title, artist: artist)
		new_song
	end
end
