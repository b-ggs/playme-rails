class SessionsController < ApplicationController
 skip_before_action :require_login, except: :logout

  def signup
	new_user = User.create_user(params[:username],params[:email],params[:password],params[:password2] )
	session[:user_id] = new_user.id
	redirect_to '/player'
  end

  def index
  	if session[:user_id]
  		redirect_to '/player'
  	end
  end

  def login
  	user = User.authenticate(params[:username], params[:password])
  	if user
  		session[:user_id] = user.id
  		redirect_to '/player'
  	else
  		redirect_to root_path
  	end
  end

  def logout
  	session[:user_id] = nil
  	redirect_to root_path
  end

end
