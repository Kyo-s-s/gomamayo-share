class PostsController < ApplicationController
  before_action :signin_check, only: :create

  def index
    limit, timestamp = index_params
    posts = Post.where(created_at: ..timestamp).limit(limit).includes(:user)
    render json: posts_serialize(posts)
  end

  def show
    post = Post.find_by(id: params[:id])
    if post
      render json: post_serialize_include_user(post, is_liked: current_user&.likes&.exists?(post_id: post.id) || false)
    else
      render json: { message: 'Post not found' }, status: :not_found
    end
  end

  def error_message_for_post(post)
    if post.errors[:content].include?('is not gomamayo')
      '投稿内容にはゴママヨを含める必要があります。'
    elsif post.errors[:content].include?('has already been taken')
      'この内容は既に投稿されています。'
    else
      'この内容は投稿できません。'
    end
  end

  def create
    post = current_user.posts.new(user_params)
    if post.save
      render json: post.serialize
    else
      render json: { message: error_message_for_post(post) }, status: :unprocessable_entity
    end
  end

  def ranking
    ranking_limit = 10
    posts = Post.unscoped.order(likes_count: :desc, created_at: :desc).limit(ranking_limit).includes(:user)
    render json: posts_serialize(posts)
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

  def posts_serialize(posts)
    current_user_likes = (current_user&.likes&.pluck(:post_id) || []) & posts.pluck(:id)
    posts.map do |post|
      post_serialize_include_user(post, is_liked: current_user_likes.include?(post.id))
    end
  end

  def post_serialize_include_user(post, is_liked: false)
    {
      post: post.serialize,
      user: post.user.serialize,
      is_liked:
    }
  end
end
