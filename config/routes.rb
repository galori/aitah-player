Rails.application.routes.draw do
  resources :posts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  get "up", to: "rails/health#show", as: :rails_health_check

  # root to: "posts#index"

  namespace :api do
    resources :posts, only: [:index, :show] do
      resources :comments, only: [:index]
    end
  end
  root 'home#index'
  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end