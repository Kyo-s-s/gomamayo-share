require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  # TODO: index test
  # TODO: show test
  test 'success create user' do
    post create_user_path, params: {
      user: {
        name: 'example',
        password: 'password'
      }
    }
    assert_response :success
  end

  test 'failure create user: invalid name' do
    post create_user_path, params: {
      user: {
        name: ' ',
        password: 'password'
      }
    }
    assert_response :unprocessable_entity
  end

  test 'failure create user: invalid password' do
    post create_user_path, params: {
      user: {
        name: 'example',
        password: 'pass'
      }
    }
    assert_response :unprocessable_entity
  end
end
