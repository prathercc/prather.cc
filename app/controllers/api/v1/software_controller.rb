# frozen_string_literal: true

module Api
  module V1
    class SoftwareController < ApplicationController
      def index
        sort_by = params[:sort_by]
        sort_dir = params[:sort_dir]
        if(sort_by && sort_dir)
          softwares = Software.order(sort_by + ' ' + sort_dir)
        else
          softwares = Software.all.sort_by(&:name)
        end
        render json: {
          message: 'Loaded software',
          data: softwares
        }, status: 200
      end

      def create
        if current_user[:group] == 'Administrator'
          software = Software.new(software_params)
          softwares = Software.all
          exists = false
          softwares.each do |s|
            exists = true if software.name == s.name
          end
          if exists
            render json: {
              message: "Software with name '#{software.name}' already exists",
              data: nil
            }, status: 400
          elsif software.save
            render json: {
              message: 'Created software',
              data: software
            }, status: 200
          else
            render json: {
              message: 'Could not create software',
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

      def destroy
        if current_user[:group] == 'Administrator'
          software = Software.find(params[:id])
          software.destroy
          render json: {
            message: 'Deleted software',
            data: software
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
          software = Software.find(params[:id])
          if software.update(software_params)
            render json: {
              message: "Updated #{software.name}",
              data: software
            }, status: 200
          else
            render json: {
              message: 'Could not update software',
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

      def software_params
        params.require(:software).permit(:is_legacy, :name, :icon_link, :description, :image_link, :windows, :linux, :mac, :android, :repo_link, :languages, :youtube_link, :dev_date)
      end
  end
  end
end
