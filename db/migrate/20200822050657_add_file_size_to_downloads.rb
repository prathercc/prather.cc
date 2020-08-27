class AddFileSizeToDownloads < ActiveRecord::Migration[6.0]
  def change
    add_column :downloads, :file_size, :integer
  end
end
