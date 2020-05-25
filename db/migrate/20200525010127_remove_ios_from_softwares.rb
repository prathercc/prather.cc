class RemoveIosFromSoftwares < ActiveRecord::Migration[6.0]
  def change

    remove_column :softwares, :ios, :boolean
  end
end
