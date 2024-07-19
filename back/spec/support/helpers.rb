module Helpers
  def log_in_kyo
    FactoryBot.create(:user_kyo)
    post login_path, params: { user: { name: 'Kyo', password: 'password' } }
  end
end
