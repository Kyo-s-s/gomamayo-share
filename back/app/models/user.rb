class User < ApplicationRecord
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          authentication_keys: [:name]
  include DeviseTokenAuth::Concerns::User

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 },
                   format: { with: /\A\w+\z/ }

  before_validation :set_uid

  def serialize
    as_json(only: %i[id name])
  end

  private

  def set_uid
    self.uid = name if uid.blank?
  end
end
