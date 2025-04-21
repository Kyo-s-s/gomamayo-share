class LikesController < ApplicationController
  before_action :signin_check, only: %i[create destroy]
  def create
    like = current_user.likes.new(post_id: params[:id])
    if like.save
      render json: { message: 'Liked' }
    else
      render json: { message: 'Post not found' }, status: :not_found
    end
  end

  def destroy
    like = Like.find_by(user_id: current_user.id, post_id: params[:id])
    if like
      like.destroy
      render json: { message: 'Unliked' }
    else
      render json: { message: 'Like not found' }, status: :not_found
    end
  end

  def all
    likes = Like.includes(:post, :user)
    render json: likes.to_json(include: { user: { only: %i[id name] }, post: { only: %i[id content created_at] } })
  end
end
