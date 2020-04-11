class CreateFeatures < ActiveRecord::Migration[6.0]
  def change
    create_table :features do |t|
      t.string :title
      t.text :description
      t.string :image_link
      t.string :content_title
      t.text :content_description
      t.string :application_name

      t.timestamps
    end
  end
end
