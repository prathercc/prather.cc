class AddYoutubeLinkToSoftwares < ActiveRecord::Migration[6.0]
  def change
    add_column :softwares, :youtube_link, :string
  end
end
