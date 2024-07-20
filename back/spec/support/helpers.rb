module Helpers
  def log_in_kyo
    FactoryBot.create(:user_kyo)
    post login_path, params: { user: { name: 'Kyo', password: 'password' } }
  end

  def sign_in(user)
    post '/auth/sign_in', params: { name: user.name, password: user.password }
    response.headers.slice('client', 'uid', 'token-type', 'access-token')
  end
end
