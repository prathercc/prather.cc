# frozen_string_literal: true

class Download < ApplicationRecord
  validates :application_name, presence: true
  validates :path, presence: true
  validates :os_type, presence: true
  validates :file_size, presence: true
  validates :file_name, presence: true
end
