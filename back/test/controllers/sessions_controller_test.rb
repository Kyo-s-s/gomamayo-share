require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  include SessionsHelper

  def setup
    @user = users(:kyo)
    @password = 'password'

    @another_user = User.create(name: 'another', password: 'hogehoge')
    @another_password = 'hogehoge'
  end

  def teardown
    @user.destroy
  end

  def log_in_as(name, password)
    post login_path, params: { user: { name:, password: } }
  end

  def log_out
    delete logout_path
  end

  test 'login and logout success' do
    log_in_as(@user.name, @password)
    assert_response :success
    assert current_user?(@user)
    assert session[:user_id] == @user.id

    log_out
    assert current_user.nil?
    assert session[:user_id].nil?
  end

  test 'login failure' do
    log_in_as(@user.name, 'invalid password')
    assert_response :unauthorized
    assert current_user.nil?
  end
end
