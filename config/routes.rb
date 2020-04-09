# frozen_string_literal: true

Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  root 'main#index'
  get 'software', to: 'main#index'
  get 'software/*path', to: 'main#index'
  namespace 'api' do
    namespace 'v1' do
      resources :download
      resources :user
      resources :sessions, only: %i[new create destroy]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
