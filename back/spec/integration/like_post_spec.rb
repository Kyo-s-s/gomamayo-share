require 'rails_helper'

RSpec.describe type: :request do
  include SessionsHelper

  describe '' do
    let!(:gomamayo) { FactoryBot.create(:post_gomamayo) }

    before do
      log_in_kyo
    end

    it 'switch like' do
      get show_post_path(gomamayo.id)
      expect(response.parsed_body[:is_liked]).to be(false)

      post create_like_path(gomamayo.id)
      get show_post_path(gomamayo.id)
      expect(response.parsed_body[:is_liked]).to be(true)

      delete destroy_like_path(gomamayo.id)
      get show_post_path(gomamayo.id)
      expect(response.parsed_body[:is_liked]).to be(false)
    end
  end
end
