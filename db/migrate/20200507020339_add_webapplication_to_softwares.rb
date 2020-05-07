class AddWebapplicationToSoftwares < ActiveRecord::Migration[6.0]
  def change
    add_column :softwares, :webapplication, :boolean
  end
end
