# frozen_string_literal: true

module Api
  module V1
    class ImageController < ApplicationController
      def index
        images = Image.order('created_at DESC')
        render json: {
          status: 'SUCCESS',
          message: 'Loaded images',
          data: images
        }, status: :ok
      end

      def show
        image = Image.find(params[:id])
        render json: {
          status: 'SUCCESS',
          message: 'Loaded image',
          data: image
        }, status: :ok
      end

      def create
        image = Image.new(image_params)

        if image.save
          render json: {
            status: 'SUCCESS',
            message: 'Created image',
            data: image
          }, status: :ok
        else
          render json: {
            status: 'ERROR',
            message: 'Could not create image',
            data: image
          }, status: :unprocessable_entity
        end
      end

      def destroy
        image = Image.find(params[:id])
        image.destroy
        render json: {
          status: 'SUCCESS',
          message: 'Deleted image',
          data: image
        }, status: :ok
      end

      def update
        image = Image.find(params[:id])
        if image.update(image_params)
          render json: {
            status: 'SUCCESS',
            message: 'Updated image',
            data: image
          }, status: :ok
        else
          render json: {
            status: 'ERROR',
            message: 'Could not update image',
            data: image
          }, status: :unprocessable_entity
        end
      end

      private

      def image_params
        params.permit(:image_name, :application_id, :image)
      end
    end
  end
end
