Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post "/sign_in", to: 'sessions#create'
        post "/sign_up", to: 'registrations#create'
        delete "/sign_out", to: 'sessions#destroy'
      end
      resources :tasks
    end
  end
end
#
#       end
#   end
#   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
#    #post 'auth_user' => 'authentication#authenticate_user'
# end
