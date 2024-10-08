class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  default_scope -> { order(created_at: :desc) }
  validates :content, presence: true, uniqueness: true, length: { maximum: 100 }
  validate :content_gomamayo_validation

  include GomamayoChecker

  def serialize
    as_json(only: %i[id content created_at likes_count])
  end

  private

  def content_gomamayo_validation
    return if gomamayo?(content)

    errors.add(:content, 'is not gomamayo')
  end
end
