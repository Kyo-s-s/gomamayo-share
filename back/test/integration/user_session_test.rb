require 'test_helper'

class UserSessionTest < ActionDispatch::IntegrationTest
  include SessionsHelper

  def create_user_as(name, password)
    post create_user_path, params: { user: { name:, password: } }
  end

  test 'logged in when sign up' do
    create_user_as('example', 'password')
    assert current_user.name == 'example'
  end
end
