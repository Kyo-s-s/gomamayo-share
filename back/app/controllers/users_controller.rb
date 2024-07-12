class UsersController < ApplicationController
  def index
    users = User.all
    render json: users.map(&:serialize)
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user.serialize
    else
      render json: { message: 'User not found' }, status: :not_found
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      log_in(user)
      render json: user.serialize
    else
      render json: { message: 'Invalid' }, status: :unprocessable_entity
    end
  end

  def destroy
    log_out
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end
end
