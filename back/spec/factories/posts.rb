FactoryBot.define do
  factory :post_gomamayo, class: 'Post' do
    content { 'ごまマヨネーズ' }
    user { FactoryBot.build(:user_kyo) }
  end
end
