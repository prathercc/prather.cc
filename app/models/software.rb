class Software < ApplicationRecord
    has_many :downloads, dependent: :destroy
    has_many :features, dependent: :destroy
end
