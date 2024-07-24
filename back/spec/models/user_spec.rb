require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'create' do
    let(:user) { FactoryBot.build(:user_kyo) }

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

      it 'is invalid name with special characters' do
        invalid_names = %w[!a a! a@b a-b あいうえお きょ]
        invalid_names.each do |invalid_name|
          user.name = invalid_name
          expect(user).to be_invalid
        end
      end

      it 'is invalid with too long name' do
        user.name = 'a' * 21
        expect(user).to be_invalid
      end
    end
  end
end
