# frozen_string_literal: true

module Api
  module V1
    class UserController < ApplicationController
      before_action :set_user, only: %i[show edit update destroy]

      # GET /user
      # GET /user.json
      def index
        if current_user
          users = User.all
          render json: {
            message: 'Retrieved users',
            data: users
          }, status: 200
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
      end

      # GET /user/1
      # GET /user/1.json
      def show; end

      # GET /user/new
      def new; end

      # GET /user/1/edit
      def edit; end

      # POST /user
      # POST /user.json
      def create
        if current_user
          user = User.new({ email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation] })
          if user.save
            render json: {
              message: 'User created',
              data: user
            }, status: 200
          else
            render json: {
              message: 'Failed to create user',
              data: nil
            }, status: 400
        end
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
      end

      # PATCH/PUT /user/1
      # PATCH/PUT /user/1.json
      def update; end

      # DELETE /user/1
      # DELETE /user/1.json
      def destroy
        if current_user
          user = User.find(params[:id])
          user.destroy
          render json: {
            message: 'Deleted user',
            data: user
          }, status: 200
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
end
end
