require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  include SessionsHelper

  def setup
    @user = users(:kyo)
    @post = posts(:gomamayo)
  end

  test 'index limit' do
    limit = 10
    get index_post_path(limit:)
    assert_response :ok
    assert response.parsed_body.length == limit
    assert response.parsed_body[0][:post][:content] == 'ごまマヨネーズ 59'
  end

  test 'index timestamp' do
    limit = 50
    timestamp = Time.new(2024, 1, 1, 2, 0, 0, '+00:00')
    get index_post_path(timestamp:, limit:)
    assert_response :ok
    assert response.parsed_body[0][:post][:content] == 'ごまマヨネーズ 59'
    assert response.parsed_body[-1][:post][:content] == "ごまマヨネーズ #{59 - limit + 1}"
  end

  test 'index timestamp2' do
    limit = 50
    timestamp = Time.new(2024, 1, 1, 0, 0, 0, '+00:00')
    get index_post_path(timestamp:, limit:)
    assert_response :ok
    assert response.parsed_body.length == 1
    assert response.parsed_body[0][:post][:content] == 'ごまマヨネーズ'
  end

  test 'success create post' do
    log_in_kyo
    post create_post_path, params: { post: { content: 'ホワイトとうもろこし' } }
    assert_response :ok
  end

  test 'failure create post unauthorized' do
    post create_post_path, params: { post: { content: 'ホワイトとうもろこし' } }
    assert_response :unauthorized
  end

  test 'failure create post duplicate' do
    log_in_kyo
    post create_post_path, params: { post: { content: @post.content } }
    assert_response :unprocessable_entity
  end

  test 'failure create post not gomamayo' do
    log_in_kyo
    post create_post_path, params: { post: { content: 'はとぽっぽー' } }
    assert_response :unprocessable_entity # FIXME: not gomamayo message
  end

  test 'show success' do
    get show_post_path(id: @post.id)
    assert_response :ok
    assert response.parsed_body[:post] == @post.serialize
    assert response.parsed_body[:post][:likes_count].zero?
    assert response.parsed_body[:user] == @post.user.serialize
    assert response.parsed_body[:is_liked] == false
  end
end
