require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  def post_user_create(name, password)
    post :create, params: { user: { name:, password: } }
  end

  describe 'POST #create' do
    it 'success' do
      post_user_create('example', 'password')
      expect(response).to be_successful
    end

    it 'failure: invalid name' do
      post_user_create(' ', 'password')
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'failure: invalid password' do
      post_user_create('example', 'pass')
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  # TODO: index, show test
end
