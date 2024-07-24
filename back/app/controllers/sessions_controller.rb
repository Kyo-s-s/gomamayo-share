class SessionsController < ApplicationController
  def sessions
    if current_user
      render json: { is_login: true, user: current_user }
    else
      render json: { is_login: false, message: 'ユーザーが存在しません' }
    end
  end
end
