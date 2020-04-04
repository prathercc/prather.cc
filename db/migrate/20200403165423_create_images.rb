class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.binary :image
      t.integer :application_id
      t.string :image_name

      t.timestamps
    end
  end
end
