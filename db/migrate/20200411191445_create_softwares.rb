class CreateSoftwares < ActiveRecord::Migration[6.0]
  def change
    create_table :softwares do |t|
      t.boolean :is_legacy
      t.string :icon_link
      t.string :name
      t.text :description
      t.string :image_link
      t.boolean :windows
      t.boolean :linux
      t.boolean :mac
      t.boolean :android
      t.boolean :ios
      t.string :repo_link
      t.string :languages

      t.timestamps
    end
  end
end
