require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  include SessionsHelper

  def log_in_as(name, password)
    post :create, params: { user: { name:, password: } }
  end

  describe 'POST #create' do
    let!(:user) { FactoryBot.create(:user_kyo) }

    it 'success' do
      log_in_as('Kyo', 'password')
      expect(response).to be_successful
      expect(current_user).to eq(user)
    end

    it 'failure: invalid password' do
      log_in_as('Kyo', 'invalid password')
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'DELETE #destroy' do
    before do
      log_in_as('Kyo', 'password')
    end

    it 'success' do
      delete :destroy
      expect(response).to be_successful
      expect(current_user).to be_nil
    end
  end
end
