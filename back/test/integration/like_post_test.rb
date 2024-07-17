require 'test_helper'

class LikePostTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:kyo)
    @post = posts(:gomamayo)
    log_in_kyo
  end

  test 'switch is_liked' do
    get show_post_path(@post.id)
    assert response.parsed_body[:is_liked] == false

    post create_like_path(@post.id)
    get show_post_path(@post.id)
    assert response.parsed_body[:is_liked] == true

    delete destroy_like_path(@post.id)
    get show_post_path(@post.id)
    assert response.parsed_body[:is_liked] == false
  end
end
