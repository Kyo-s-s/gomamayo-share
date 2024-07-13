require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  # TODO: index test
  # TODO: show test

  def create_user_as(name, password)
    post create_user_path, params: { user: { name:, password: } }
  end

  test 'success create user' do
    create_user_as('example', 'password')
    assert_response :success
  end

  test 'failure create user: invalid name' do
    create_user_as(' ', 'password')
    assert_response :unprocessable_entity
  end

  test 'failure create user: invalid password' do
    create_user_as('example', 'pass')
    assert_response :unprocessable_entity
  end
end
