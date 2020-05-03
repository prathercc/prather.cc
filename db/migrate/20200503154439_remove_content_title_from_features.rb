class RemoveContentTitleFromFeatures < ActiveRecord::Migration[6.0]
  def change

    remove_column :features, :content_title, :string
  end
end
