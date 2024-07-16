class PostsController < ApplicationController
  before_action :log_in_check, only: :create

  def index
    limit, timestamp = index_params
    posts = Post.where(created_at: ..timestamp).limit(limit).includes(:user)
    current_user_likes = (current_user&.likes&.pluck(:post_id) || []) & posts.pluck(:id) # よくわかっていない...
    render json: posts.map { |post|
      post_serialize_include_user(post, is_liked: current_user_likes.include?(post.id))
    }
  end

  def show
    post = Post.find_by(id: params[:id])
    if post
      render json: post_serialize_include_user(post, is_liked: current_user&.likes&.exists?(post_id: post.id) || false)
    else
      render json: { message: 'Post not found' }, status: :not_found
    end
  end

  def create
    post = current_user.posts.new(user_params)
    if post.save
      render json: post.serialize
    else
      render json: { message: 'Invalid content' }, status: :unprocessable_entity
    end
  end

  private

  def index_params
    limit = params[:limit] || 50
    timestamp = params[:timestamp] || Time.zone.now
    [limit, timestamp]
  end

  def user_params
    params.require(:post).permit(:content)
  end

  def post_serialize_include_user(post, is_liked: false)
    {
      post: post.serialize,
      user: post.user.serialize,
      is_liked:
    }
  end
end
