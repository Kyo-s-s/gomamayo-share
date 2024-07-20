require 'rails_helper'

RSpec.describe type: :request do
  describe '' do
    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }
    let!(:user) { FactoryBot.create(:user_kyo) }
    let!(:header) { sign_in user }

    it 'switch like' do
      get show_post_path(gomamayo.id), headers: header
      expect(response.parsed_body[:is_liked]).to be(false)

      post create_like_path(gomamayo.id), headers: header
      get show_post_path(gomamayo.id), headers: header
      expect(response.parsed_body[:is_liked]).to be(true)

      delete destroy_like_path(gomamayo.id), headers: header
      get show_post_path(gomamayo.id), headers: header
      expect(response.parsed_body[:is_liked]).to be(false)
    end
  end
end
