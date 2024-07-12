require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  include SessionsHelper

  def setup
    @name = 'example'
    @password = 'password'
    @user = User.create(name: @name, password: @password)
  end

  def teardown
    @user.destroy
  end

  def log_in_as(name, password)
    post login_path, params: { user: { name:, password: } }
  end

  test 'login success' do
    log_in_as(@name, @password)
    assert_response :success
    assert current_user?(@user)
    delete logout_path
    assert current_user.nil?
  end

  test 'login failure' do
    log_in_as(@name, 'invalid password')
    assert_response :unauthorized
    assert current_user.nil?
  end
end