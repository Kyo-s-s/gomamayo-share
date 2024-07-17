require 'test_helper'

class LikesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:kyo)
    @post = posts(:gomamayo)
  end

  test 'success like create and destroy' do
    log_in_kyo
    initial_likes_count = @post.likes_count
    post create_like_path(id: @post.id)
    assert_response :ok
    @post.reload
    assert initial_likes_count + 1 == @post.likes_count
    delete destroy_like_path(id: @post.id)
    assert_response :ok
    @post.reload
    assert initial_likes_count == @post.likes_count
  end

  test 'failure like create unauthorized' do
    post create_like_path(id: @post.id)
    assert_response :unauthorized
  end

  test 'failure like create not found' do
    log_in_kyo
    post create_like_path(id: 0)
    assert_response :not_found
  end
end
