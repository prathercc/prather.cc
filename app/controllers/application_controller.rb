# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, if: proc { |c| c.request.format == 'application/json' }
  helper_method :current_user

  def current_user
    current_user = nil

    if session[:user_id]
      users = User.all
      users.each do |user|
        current_user = user if user.token == session[:user_id]
      end
    end
    current_user
  end
end
