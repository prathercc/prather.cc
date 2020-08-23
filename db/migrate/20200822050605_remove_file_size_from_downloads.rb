class RemoveFileSizeFromDownloads < ActiveRecord::Migration[6.0]
  def change

    remove_column :downloads, :file_size, :string
  end
end
