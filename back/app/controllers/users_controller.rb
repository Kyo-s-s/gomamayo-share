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

  def all
    users = User.all
    render json: users.to_json(only: %i[id name created_at updated_at])
  end
end
