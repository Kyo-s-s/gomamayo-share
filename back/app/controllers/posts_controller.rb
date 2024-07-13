class PostsController < ApplicationController
  before_action :log_in_check, only: :create

  def index
    posts = Post.all
    render json: posts.map(&:serialize)
  end

  def show
    post = Post.find_by(id: params[:id])
    if post
      render json: post.serialize
    else
      render json: { message: 'Post not found' }, status: :not_found
    end
  end

  def create
    # TODO
  end
end
