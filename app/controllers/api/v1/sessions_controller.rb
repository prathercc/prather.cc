# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      def new; end

      def index
        render json: {
          status: 'SUCCESS',
          message: 'Retrieved current session',
          data: session[:user_id]
        }, status: 200
      end

      def create
        user = User.find_by_email(params[:email])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: {
            status: 'SUCCESS',
            message: 'Session created',
            data: session[:user_id]
          }, status: 200
        else
          render json: {
            status: 'FAILURE',
            message: 'Unable to create session',
            data: nil
          }, status: 400
        end
      end

      def destroy
        session[:user_id] = nil
        render json: {
          status: 'SUCCESS',
          message: 'Session ended',
          data: nil
        }, status: 200
      end
    end
end
end
