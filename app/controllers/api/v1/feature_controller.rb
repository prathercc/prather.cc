# frozen_string_literal: true

module Api
  module V1
    class FeatureController < ApplicationController
      def index
          software = Software.find(params[:software_id])
          features = software.features.all.sort_by(&:id)
          if features
            render json: {
              message: 'Loaded feature',
              data: features
            }, status: 200
          else
            render json: {
              message: 'No features found with the given software id',
              data: nil
            }, status: 400
          end
    end

      def create
        if current_user[:group] == 'Administrator'
          software = Software.find(params[:software_id])
          feature = software.features.create(feature_params)
          render json: {
            message: 'Created feature',
            data: feature
          }, status: 200
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
      end

      def destroy
        if current_user[:group] == 'Administrator'
          feature = Feature.find(params[:id])
          feature.destroy
          render json: {
            message: 'Deleted feature',
            data: feature
          }, status: 200
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
        end

      def update
        if current_user[:group] == 'Administrator'
          feature = Feature.find(params[:id])
          if feature.update(feature_params)
            render json: {
              message: 'Updated',
              data: feature
            }, status: 200
          else
            render json: {
              message: 'Could not update feature',
              data: feature
            }, status: 400
          end
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
          end

      def feature_params
        params.require(:feature).permit(:title, :image_link, :content_description, :application_name, :software_id)
      end
end
end
end
