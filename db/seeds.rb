# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
1.times do
  Image.create({
                 application_id: 1,
                 image_name: 'Test Image Name',
                 image: 'deadbeef'.bytes
               })
  Image.create({
                 application_id: 22,
                 image_name: 'Another image name test',
                 image: 'test'.bytes
               })
end
