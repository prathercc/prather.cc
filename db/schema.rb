# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_07_020339) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "downloads", force: :cascade do |t|
    t.string "path"
    t.integer "download_count"
    t.string "application_name"
    t.string "os_type"
    t.string "file_name"
    t.string "file_size"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "software_id", null: false
    t.index ["software_id"], name: "index_downloads_on_software_id"
  end

  create_table "features", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "image_link"
    t.text "content_description"
    t.string "application_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "software_id", null: false
    t.index ["software_id"], name: "index_features_on_software_id"
  end

  create_table "softwares", force: :cascade do |t|
    t.boolean "is_legacy"
    t.string "icon_link"
    t.string "name"
    t.text "description"
    t.string "image_link"
    t.boolean "windows"
    t.boolean "linux"
    t.boolean "mac"
    t.boolean "android"
    t.boolean "ios"
    t.string "repo_link"
    t.string "languages"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "webapplication"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "token"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "downloads", "softwares"
  add_foreign_key "features", "softwares"
end
