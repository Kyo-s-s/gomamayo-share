FactoryBot.define do
  factory :like_gomamayo_kyo, class: 'Like' do
    post { association :post_gomamayo }
    user { association :user_kyo }
    initialize_with { Like.find_or_create_by(user:, post:) }
  end

  factory :like_gomamayo_another, class: 'Like' do
    post { association :post_gomamayo }
    user { association :user_another }
    initialize_with { Like.find_or_create_by(user:, post:) }
  end

  factory :like_asadoreretasu_kyo, class: 'Like' do
    post { association :post_asadoreretasu }
    user { association :user_kyo }
    initialize_with { Like.find_or_create_by(user:, post:) }
  end
end
