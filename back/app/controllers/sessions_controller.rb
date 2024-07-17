class SessionsController < ApplicationController
  def create
    user = User.find_by(name: params[:user][:name])
    if user&.authenticate(params[:user][:password])
      reset_session
      log_in(user)
      render json: user.serialize
    else
      render json: { message: 'login failure' }, status: :unauthorized
    end
  end

  def destroy
    log_out
  end
end
