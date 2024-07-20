class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies
  include AuthHelper

  # def provider
  #   super
  #   'name'
  # end
end
