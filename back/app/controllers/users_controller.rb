class UsersController < ApplicationController
  def index
    users = User.all
    render json: users.map { |user| serialize_user(user) }
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: serialize_user(user)
    else
      render json: { error: 'User not found', status: 404 }, status: :not_found
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: serialize_user(user)
    else
      render json: { error: 'Invalid', status: 422 }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end

  def serialize_user(user)
    user.as_json(only: %i[id name])
  end
end
