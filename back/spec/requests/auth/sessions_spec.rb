require 'rails_helper'

RSpec.describe 'Auth::Sessions', type: :request do
  describe 'GET /auth/sessions' do # login check
    context 'when success login check' do
      let!(:user) { FactoryBot.create(:user_kyo) }
      let!(:header) { sign_in user }

      it 'success' do
        get '/auth/sessions', headers: header
        expect(response.parsed_body['is_login']).to be(true)
        expect(response.parsed_body['user']['name']).to eq(user.name)
      end

      it 'failure after sign_out' do
        delete '/auth/sign_out', headers: header
        get '/auth/sessions', headers: header
        expect(response.parsed_body['is_login']).to be(false)
      end
    end

    context 'when failure login check' do
      it 'not found user' do
        get '/auth/sessions'
        expect(response.parsed_body['is_login']).to be(false)
        expect(response.parsed_body['message']).to eq('ユーザーが存在しません')
      end
    end
  end
end
