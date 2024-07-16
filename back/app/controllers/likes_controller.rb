class LikesController < ApplicationController
  before_action :log_in_check, only: %i[create destroy]
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
end
