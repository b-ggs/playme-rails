class Playlist < ActiveRecord::Base
	has_many :songs

	def self.new_playlist(name)
		return false if Playlist.where(name: name).to_a.size > 0

		new_playlist = Playlist.create(name: name)
		new_playlist
	end
end
