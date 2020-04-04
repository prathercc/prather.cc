# frozen_string_literal: true

class Image < ApplicationRecord
  validates :application_id, presence: true
  validates :image_name, presence: true
end
