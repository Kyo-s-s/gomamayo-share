FactoryBot.define do
  factory :post_gomamayo, class: 'Post' do
    content { 'ごまマヨネーズ' }
    user { association :user_kyo }
    created_at { Time.new(2024, 1, 1, 0, 0, 0, '+00:00') }
    initialize_with { Post.find_or_create_by(content:) }
  end

  factory :post_asadoreretasu, class: 'Post' do
    content { '朝採れレタス' }
    user { association :user_kyo }
    created_at { Time.new(2023, 12, 31, 0, 0, 0, '+00:00') }
    initialize_with { Post.find_or_create_by(content:) }
  end

  factory :post_gomamayos, class: 'Post' do
    sequence(:content) { |n| "ごまマヨネーズ_#{n}" }
    user { association :user_kyo }
    sequence(:created_at) { |n| Time.new(2024, 1, 1, 1, n % 60, 0, '+00:00') }
  end
end
