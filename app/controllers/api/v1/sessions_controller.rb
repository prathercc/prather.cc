# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      def new; end

      def index
        if current_user
          render json: {
            message: 'Retrieved current session',
            data: current_user
          }, status: 200
        else
          render json: {
            message: 'No session found',
            data: nil
          }, status: 200
        end
      end

      def create
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
          user.token = SecureRandom.uuid
          user.save
          session[:user_id] = user.token
          render json: {
            message: 'Session created',
            data: current_user
          }, status: 200
        else
          render json: {
            message: 'Unable to create session',
            data: nil
          }, status: 400
        end
      end

      def destroy
        session[:user_id] = nil
        render json: {
          message: 'Session ended',
          data: nil
        }, status: 200
      end
    end
end
end
