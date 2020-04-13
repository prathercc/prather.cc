# frozen_string_literal: true

module Api
  module V1
    class FeatureController < ApplicationController
      def index
        app_name = params[:application_name]
        id = params[:id]
        features = Feature.all
        if !app_name.nil?
          filtered_features = []
          features.each do |d|
            filtered_features.push(d) if d.application_name == app_name
          end
          render json: {
            message: "Retrieved '#{app_name}'",
            data: filtered_features.first
          }, status: 200
        elsif !id.nil?
          feature = Feature.find(id)
          render json: {
            message: "Retrieved feature",
            data: feature
          }, status: 200
        else
          render json: {
            message: 'Loaded feature',
            data: features
          }, status: 200
        end
    end

      def create
        if current_user
          feature = Feature.new(feature_params)
          features = Feature.all
          exists = false
          features.each do |s|
            exists = true if feature.name == s.name
          end
          if exists
            render json: {
              message: "Feature with name '#{feature.name}' already exists",
              data: feature
            }, status: 400
          elsif feature.save
            render json: {
              message: 'Created feature',
              data: feature
            }, status: 200
          else
            render json: {
              message: 'Could not create feature',
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

      def destroy
        if current_user
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
        if current_user
          feature = Feature.find(params[:id])
          if feature.update(feature_params)
            render json: {
              message: "Updated #{feature.name}",
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
        params.require(:feature).permit(:title, :description, :image_link, :content_title, :content_description, :application_name)
      end
end
end
end
