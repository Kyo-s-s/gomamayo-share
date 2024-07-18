FactoryBot.define do
  factory :user_kyo, class: 'User' do
    name { 'Kyo' }
    password { 'password' }
  end

  factory :user_another, class: 'User' do
    name { 'another' }
    password { 'hogehoge' }
  end
end
