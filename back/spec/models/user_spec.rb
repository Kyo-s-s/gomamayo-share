require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'create' do
    let(:user) { FactoryBot.create(:user) }

    context 'with valid' do
      it 'is valid' do
        expect(user).to be_valid
      end
    end

    context 'with invalid' do
      it 'is invalid without name' do
        user.name = '   '
        expect(user).to be_invalid
      end

      it 'is invalid with too long name' do
        user.name = 'a' * 21
        expect(user).to be_invalid
      end

      it 'is invalid without password' do
        user.password = '   '
        expect(user).to be_invalid
      end

      it 'is invalid with too short password' do
        user.password = 'a' * 5
        expect(user).to be_invalid
      end
    end
  end
end
