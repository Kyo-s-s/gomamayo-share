require 'rails_helper'

RSpec.describe 'Auth::Registrations', type: :request do
  describe 'POST /auth' do # signup
    context 'when success create user' do
      it 'success' do
        post '/auth',
             params: { name: 'Kyo', password: 'password' }
        expect(response).to be_successful
      end
    end

    context 'when failure create user' do
      let!(:user) { FactoryBot.create(:user_kyo) }

      it 'failure' do
        post '/auth',
             params: { name: user.name, password: 'password' }
        expect(response.parsed_body['errors']['full_messages']).to eq(['Name has already been taken'])
      end
    end
  end

  describe 'POST /auth/sign_in' do # login
    let!(:user) { FactoryBot.create(:user_kyo) }

    context 'when success login' do
      it 'success' do
        post '/auth/sign_in', params: { name: user.name, password: user.password }
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE /auth/sign_out' do # logout
    let!(:user) { FactoryBot.create(:user_kyo) }
    let!(:header) { sign_in user }

    context 'when success logout' do
      it 'success' do
        delete '/auth/sign_out', headers: header
        expect(response.parsed_body['success']).to be(true)
      end
    end

    context 'when failure logout' do
      it 'failure' do
        delete '/auth/sign_out'
        expect(response.parsed_body['errors']).to eq(['User was not found or was not logged in.'])
      end
    end
  end

  describe 'simultaneous login and logout' do
    let!(:user) { FactoryBot.create(:user_kyo) }

    it 'success' do
      header1 = sign_in user
      header2 = sign_in user
      expect(response).to be_successful
      get '/auth/sessions', headers: header1
      expect(response.parsed_body['is_login']).to be(true)
      get '/auth/sessions', headers: header2
      expect(response.parsed_body['is_login']).to be(true)

      delete '/auth/sign_out', headers: header1

      get '/auth/sessions', headers: header1
      expect(response.parsed_body['is_login']).to be(false)

      # After sign_out, the other sessions are broken.
      get '/auth/sessions', headers: header2
      expect(response.parsed_body['is_login']).to be(false)

      header3 = sign_in user
      get '/auth/sessions', headers: header3
      expect(response.parsed_body['is_login']).to be(true)
    end
  end
end
