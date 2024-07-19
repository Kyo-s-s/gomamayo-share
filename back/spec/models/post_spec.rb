require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'create' do
    let(:gomamayo) { FactoryBot.build(:post_gomamayo) }

    context 'with valid' do
      it 'is valid' do
        expect(gomamayo).to be_valid
      end
    end
  end
end
