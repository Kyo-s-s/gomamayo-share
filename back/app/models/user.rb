class User < ApplicationRecord
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }

  def serialize
    as_json(only: %i[id name])
  end
end
