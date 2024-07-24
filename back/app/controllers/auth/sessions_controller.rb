class Auth::SessionsController < DeviseTokenAuth::SessionsController
  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  # https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/controllers/devise_token_auth/sessions_controller.rb
  def destroy
    # remove auth instance variables so that after_action does not run
    user = remove_instance_variable(:@resource) if @resource
    client = @token.client
    @token.clear!

    if user && client && user.tokens[client]
      # After sign_out, the other sessions are broken.
      user.tokens.clear
      # user.tokens.delete(client)
      user.save!

      if DeviseTokenAuth.cookie_enabled
        # If a cookie is set with a domain specified then it must be deleted with that domain specified
        # See https://api.rubyonrails.org/classes/ActionDispatch/Cookies.html
        cookies.delete(DeviseTokenAuth.cookie_name, domain: DeviseTokenAuth.cookie_attributes[:domain])
      end

      yield user if block_given?

      render_destroy_success
    else
      render_destroy_error
    end
  end
  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength
end
