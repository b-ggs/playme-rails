class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_login

  def player
    redirect_to root_path if session[:user_id].nil?

  	@username = User.find(session[:user_id])
    @playlists = Playlist.where(user_id:session[:user_id]).all.to_a
  end

  def innerplayer
    @username = User.find(session[:user_id])
    @playlists = Playlist.where(user_id:session[:user_id]).all.to_a
    session[:playlist] = nil
  end

  def innerplaylist
    @playlist = Playlist.where(id:session[:playlist], user_id:session[:user_id]).first
    @playlistcontent = Song.where(playlist_id:session[:playlist], user_id:session[:user_id])
  end

  def current_user
  	User.where(id:session[:user_id]).first
  end

  def upload
    user_id = session[:user_id]
    playlist_id = params[:pId]
    uploaded_io = params[:sFile]
    title = params[:sTitle]
    artist = params[:sArtist]
    album = params[:sAlbum]

    File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
      file.write(uploaded_io.read)
    end

    Song.new_song(user_id, playlist_id, uploaded_io.original_filename, title, artist, album)

    redirect_to '/'
  end

  def new_playlist
    name = params[:pName]
    userid = User.where(id:session[:user_id]).first.id

    Playlist.new_playlist(userid, name)

    redirect_to '/innerplayer'
  end

  def playlist_select
    session[:playlist] = params[:pId]

    redirect_to '/innerplaylist'
  end

  def playlist_edit
    playlist_id = params[:pId]
    playlist_name = params[:pName]

    Playlist.where(id:playlist_id).update_all(name:playlist_name)

    redirect_to '/innerplaylist'
  end

  def playlist_delete
    playlist_id = params[:pId]

    Song.where(playlist_id:playlist_id).all.destroy_all
    Playlist.where(id:playlist_id).all.destroy_all

    session[:playlist] = nil

    redirect_to '/innerplayer'
  end

  def playlist_item_delete
    song_id = params[:itemId]

    Song.where(id:song_id).all.destroy_all

    redirect_to '/innerplaylist'
  end

  def require_login
  	redirect_to root_path if session[:user_id].nil?
  end

end



