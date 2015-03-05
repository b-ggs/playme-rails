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
    playlist_id = params[:icon_playlist]
    uploaded_io = params[:song]
    title = params[:icon_title]
    artist = params[:icon_artist]
    album = params[:icon_album]

    File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
      file.write(uploaded_io.read)
    end

    Song.new_song(user_id, playlist_id, uploaded_io.original_filename, title, artist, album)

    redirect_to '/'
  end

  def new_playlist
    name = params[:pname]
    userid = User.where(id:session[:user_id]).first.id

    Playlist.new_playlist(userid, name)

    redirect_to '/innerplayer'
  end

  def playlist_select
    session[:playlist] = params[:playlistId]

    redirect_to '/innerplaylist'
  end

  def playlist_item_select
    @selected_playlist = Playlist.where(id:session[:playlist])
    @selected_song = Song.where(id:params[:songId], playlist_id:session[:playlist])

    redirect_to '/innerplaylist'
  end

  def require_login
  	redirect_to root_path if session[:user_id].nil?
  end

end



