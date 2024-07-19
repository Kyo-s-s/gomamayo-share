require 'rails_helper'

RSpec.describe PostsController, type: :request do
  include SessionsHelper

  describe 'GET #index' do
    before do
      FactoryBot.create(:post_gomamayo)
      FactoryBot.create(:post_asadoreretasu)
    end

    it 'success' do
      FactoryBot.create_list(:post_gomamayos, 59)
      get index_post_path(limit: 10)
      expect(response).to be_successful
      expect(response.parsed_body.length).to eq(10)
      expect(response.parsed_body[0][:post][:content]).to eq('ごまマヨネーズ_59')
    end

    it 'timestamp1' do
      timestamp = Time.new(2024, 1, 1, 0, 0, 0, '+00:00')
      get index_post_path(timestamp:)
      expect(response).to be_successful
      expect(response.parsed_body[0][:post][:content]).to eq('ごまマヨネーズ')
    end

    it 'timestamp2' do
      timestamp = Time.new(2023, 12, 31, 0, 0, 0, '+00:00')
      get index_post_path(timestamp:)
      expect(response).to be_successful
      expect(response.parsed_body[0][:post][:content]).to eq('朝採れレタス')
    end
  end

  describe 'GET #ranking' do
    before do
      FactoryBot.create(:like_gomamayo_kyo)
      FactoryBot.create(:like_gomamayo_another)
      FactoryBot.create(:like_asadoreretasu_kyo)
    end

    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }
    let!(:asadoreretasu) { FactoryBot.create(:post_asadoreretasu) }
    let!(:gomamayos) { FactoryBot.create_list(:post_gomamayos, 60) }

    it 'success' do
      get ranking_post_path
      expect(response).to be_successful
      expect(response.parsed_body[0][:post]).to eq(gomamayo.serialize)
      expect(response.parsed_body[1][:post]).to eq(asadoreretasu.serialize)
      expect(response.parsed_body[2][:post]).to eq(gomamayos[59].serialize)
      expect(response.parsed_body[3][:post]).to eq(gomamayos[58].serialize)
    end
  end

  describe 'POST #create' do
    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }

    context 'with login' do
      before do
        log_in_kyo
      end

      it 'success' do
        post create_post_path, params: { post: { content: 'ホワイトとうもろこし' } }
        expect(response).to be_successful
      end

      it 'post duplicate' do
        post create_post_path, params: { post: { content: gomamayo.content } }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'not gomamayo' do
        post create_post_path, params: { post: { content: 'はとぽっぽー' } }
        expect(response).to have_http_status(:unprocessable_entity) # FIXME: not gomamayo message
      end
    end

    context 'without login' do
      it 'failure' do
        post create_post_path, params: { post: { content: 'ホワイトとうもろこし' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET #show' do
    let!(:user) { FactoryBot.create(:user_kyo) }
    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }

    it 'success' do
      get show_post_path(id: gomamayo.id)
      expect(response).to be_successful
      expect(response.parsed_body[:post]).to eq(gomamayo.serialize)
      expect(response.parsed_body[:user]).to eq(user.serialize)
    end
  end
end
