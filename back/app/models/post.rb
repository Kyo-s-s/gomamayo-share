class Post < ApplicationRecord
  belongs_to :user
  default_scope -> { order(created_at: :desc) }
  validates :content, presence: true, uniqueness: true, length: { maximum: 100 }

  def serialize
    as_json(only: %i[id content created_at])
  end

  def serialize_include_user
    {
      post: serialize,
      user: user.serialize
    }
  end
end
