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
                    application_name: 'testapp',
                    path: 'http://prather.cc/somelink.ewxe',
                    os_type: 'Lindows'
                  })
  Download.create({
                    application_name: 'testapp2',
                    path: 'http://prather.cc/somelink.deweb',
                    os_type: 'Winux'
                  })
end
