FactoryBot.define do
  factory :user_kyo, class: 'User' do
    name { 'Kyo' }
    email { 'example@example.com' }
    password { 'password' }
    initialize_with { User.find_or_create_by(name:) }
  end

  factory :user_another, class: 'User' do
    name { 'another' }
    password { 'hogehoge' }
    initialize_with { User.find_or_create_by(name:) }
  end
end
