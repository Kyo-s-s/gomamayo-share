# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    if Rails.env.production?
      origins 'https://gomamayo-share.vercel.app'
    else
      origins 'http://localhost:3001'
    end

    resource '*',
             headers: :any,
             expose: %w[access-token uid client],
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
