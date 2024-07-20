module AuthHelper
  def signin_check
    return unless current_user.nil?

    render json: { message: 'Not Authorized' }, status: :unauthorized
  end
end
