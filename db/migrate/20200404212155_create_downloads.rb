# frozen_string_literal: true

class CreateDownloads < ActiveRecord::Migration[6.0]
  def change
    create_table :downloads do |t|
      t.string :path
      t.integer :download_count
      t.string :application_name
      t.string :os_type
      t.string :file_name
      t.string :file_size

      t.timestamps
    end
  end
end
