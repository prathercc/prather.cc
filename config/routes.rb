Rails.application.routes.draw do
  root 'main#index'
  get 'software', to: 'main#index'
  get 'software/*path', to: 'main#index'
  namespace 'api' do
    namespace 'v1' do
      resources :image
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
