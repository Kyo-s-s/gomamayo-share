class PostsController < ApplicationController
  before_action :log_in_check, only: :create

  def index
    posts = Post.all
    render json: posts.map(&:serialize_include_user)
  end

  def show
    post = Post.find_by(id: params[:id])
    if post
      render json: post.serialize_include_user
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

  def user_params
    params.require(:post).permit(:content)
  end
end
