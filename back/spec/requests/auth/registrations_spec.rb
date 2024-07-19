require 'rails_helper'

RSpec.describe 'Auth::Registrations', type: :request do
  describe 'POST /auth' do # signup
    context 'when success create user' do
      it 'success' do
        post '/auth',
             params: { name: 'Kyo', email: 'example@example.com', password: 'password',
                       password_confirmation: 'password' }
        expect(response).to be_successful
      end
    end

    context 'when failure create user' do
      it 'failure' do
        post '/auth',
             params: { name: 'Kyo', email: 'example@example.com', password: 'password',
                       password_confirmation: 'invalid_password' }
        expect(response.parsed_body['errors']['full_messages']).to eq(["Password confirmation doesn't match Password"])
      end
    end
  end

  describe 'POST /auth/sign_in' do # login
    let!(:user) { FactoryBot.create(:user_kyo) }

    context 'when success login' do
      it 'success' do
        post '/auth/sign_in', params: { email: user.email, password: user.password }
        expect(response).to be_successful
      end
    end
  end

  describe 'POST /auth/sessions' do # login check
  end

  describe 'DELETE /auth/sign_out' do # logout
  end
end
