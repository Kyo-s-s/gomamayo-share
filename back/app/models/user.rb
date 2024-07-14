class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_secure_password
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
  validates :password, presence: true, length: { minimum: 6 }

  def serialize
    # FIXME: user: { as_json(...) }
    as_json(only: %i[id name])
  end

  def self.digest(string)
    cost = if ActiveModel::SecurePassword.min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost:)
  end
end
