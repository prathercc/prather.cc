class RemoveDescriptionFromFeatures < ActiveRecord::Migration[6.0]
  def change

    remove_column :features, :description, :text
  end
end
