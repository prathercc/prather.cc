class RemoveWebapplicationFromSoftwares < ActiveRecord::Migration[6.0]
  def change

    remove_column :softwares, :webapplication, :boolean
  end
end
