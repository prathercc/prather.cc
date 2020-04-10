# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
1.times do
  Download.create({
                    application_name: 'Click-Servant',
                    path: 'http://prather.cc/somelink.ewxe',
                    os_type: 'Windows',
                    file_size: '5.3mb',
                    file_name: 'ClickServant.exe',
                    download_count: 0
                  })
  User.create({
                email: 'admin@prather.cc',
                password: 'test',
                password_confirmation: 'test'
              })
end
