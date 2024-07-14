require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  include SessionsHelper

  def setup
    @user = users(:kyo)
    @post = posts(:gomamayo)
  end

  # FIXME!! DRY
  def log_in_as(name, password)
    post login_path, params: { user: { name:, password: } }
  end

  test 'success create post' do
    log_in_as(@user.name, 'password')
    post create_post_path, params: { post: { content: 'ホワイトとうもろこし' } }
    assert_response :ok
  end

  test 'failure create post unauthorized' do
    post create_post_path, params: { post: { content: 'ホワイトとうもろこし' } }
    assert_response :unauthorized
  end

  test 'failure create post duplicate' do
    log_in_as(@user.name, 'password')
    post create_post_path, params: { post: { content: @post.content } }
    assert_response :unprocessable_entity
  end

  test 'show success' do
    get show_post_path(id: @post.id)
    assert_response :ok
  end
end
