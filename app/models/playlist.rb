class Playlist < ActiveRecord::Base
	has_many :songs

	def self.new_playlist(userid, name)
		return false if Playlist.where(name: name).to_a.size > 0

		new_playlist = Playlist.create(user_id: userid, name: name)
		new_playlist
	end
end