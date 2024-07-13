module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
    # FIXME: session token?
  end

  def log_out
    session.delete(:user_id)
  end

  def current_user
    return unless (user_id = session[:user_id])

    User.find_by(id: user_id)
  end

  def current_user?(user)
    user && user == current_user
  end
end
