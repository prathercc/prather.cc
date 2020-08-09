# frozen_string_literal: true

Rails.application.routes.draw do
  root 'main#index'
  get 'maintenance', to: 'main#index'
  get 'software', to: 'main#index'
  get 'software/*path', to: 'main#index'
  namespace 'api' do
    namespace 'v1' do
      resources :download
      resources :user
      resources :sessions, only: %i[create destroy index]
      resources :software, only: %i[create destroy index update]
      resources :feature, only: %i[create destroy index update]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
