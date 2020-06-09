class RemoveDownloadCountFromDownloads < ActiveRecord::Migration[6.0]
  def change

    remove_column :downloads, :download_count, :integer
  end
end
