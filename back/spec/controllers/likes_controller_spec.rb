require 'rails_helper'

RSpec.describe LikesController, type: :request do
  describe 'POST #create' do
    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }

    context 'with login' do
      let!(:user) { FactoryBot.create(:user_kyo) }
      let!(:header) { sign_in user }

      it 'success' do
        initial_likes_count = gomamayo.likes_count
        post create_like_path(id: gomamayo.id), headers: header
        expect(response).to be_successful
        gomamayo.reload
        expect(initial_likes_count + 1).to eq(gomamayo.likes_count)
      end

      it 'failure not found' do
        post create_like_path(id: 0), headers: header
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'without login' do
      it 'failure' do
        post create_like_path(id: gomamayo.id)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE #destroy' do
    before do
      FactoryBot.create(:like_gomamayo_kyo)
    end

    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }

    context 'with login' do
      let!(:user) { FactoryBot.create(:user_kyo) }
      let!(:header) { sign_in user }

      it 'success' do
        initial_likes_count = gomamayo.likes_count
        delete destroy_like_path(id: gomamayo.id), headers: header
        expect(response).to be_successful
        gomamayo.reload
        expect(initial_likes_count - 1).to eq(gomamayo.likes_count)
      end

      it 'failure not found' do
        delete destroy_like_path(id: 0), headers: header
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'without login' do
      it 'failure' do
        delete destroy_like_path(id: gomamayo.id)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
