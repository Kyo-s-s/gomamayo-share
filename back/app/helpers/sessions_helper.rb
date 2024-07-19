module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
    # FIXME!!: https://techracho.bpsinc.jp/hachi8833/2023_06_02/130443
  end

  def log_out
    session.delete(:user_id)
    @current_user = nil
  end

  # def current_user
  #   return unless (user_id = session[:user_id])

  #   @current_user ||= User.find_by(id: user_id)
  # end

  def current_user?(user)
    user && user == current_user
  end

  def log_in_check
    return unless current_user.nil?

    render json: { message: 'Not Authorized' }, status: :unauthorized
  end
end
