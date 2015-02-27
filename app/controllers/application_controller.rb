class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_login

 
  def player
  	@username = User.find(session[:user_id])
    @playlists = Playlist.all.to_a
  end


  def current_user
  	User.where(id:session[:user_id]).first
  end

  def upload
    uploaded_io = params[:song]
    title = params[:title]
    artist = params[:artist]

    File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
      file.write(uploaded_io.read)
    end

    Song.new_song(uploaded_io.original_filename, title, artist)

    redirect_to root_path
  end

  def new_playlist
    name = params[:pname]

    Playlist.new_playlist(name)

    redirect_to root_path
  end

  private

  def require_login
  	redirect_to root_path if session[:user_id].nil?
  end

end



