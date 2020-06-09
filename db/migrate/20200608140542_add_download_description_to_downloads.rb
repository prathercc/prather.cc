class AddDownloadDescriptionToDownloads < ActiveRecord::Migration[6.0]
  def change
    add_column :downloads, :download_description, :text
  end
end
