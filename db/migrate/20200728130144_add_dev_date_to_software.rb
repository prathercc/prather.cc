class AddDevDateToSoftware < ActiveRecord::Migration[6.0]
  def change
    add_column :softwares, :dev_date, :date
  end
end
