Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks], controllers: {
    registrations: 'auth/registrations',
    sessions: 'auth/sessions'
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  get    'users', to: 'users#index'
  get    'users/:id', to: 'users#show', as: 'show_user'
  get    'auth/sessions', to: 'sessions#sessions'
  post   'posts', to: 'posts#create', as: 'create_post'
  get    'posts', to: 'posts#index', as: 'index_post'
  get    'posts/ranking', to: 'posts#ranking', as: 'ranking_post'
  get    'posts/:id', to: 'posts#show', as: 'show_post'
  post   'likes/:id', to: 'likes#create', as: 'create_like'
  delete 'likes/:id', to: 'likes#destroy', as: 'destroy_like'
end
