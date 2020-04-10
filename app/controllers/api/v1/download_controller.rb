# frozen_string_literal: true

module Api
  module V1
    class DownloadController < ApplicationController
      def index
        app_name = params[:application_name]
        downloads = Download.all
        if !app_name.nil?
          filtered_downloads = []

          downloads.each do |d|
            filtered_downloads.push(d) if d.application_name == app_name
          end
          render json: {
            message: "Retrieved downloads for '#{app_name}'",
            data: filtered_downloads
          }, status: 200
        else
          render json: {
            message: 'Loaded downloads',
            data: downloads
          }, status: 200
        end
      end

      def show
        download = Download.find(params[:id])
        render json: {
          message: 'Loaded download',
          data: download
        }, status: 200
      end

      def create
        if current_user
          download = Download.new(download_params)
          if download.save
            render json: {
              message: 'Created download',
              data: download
            }, status: 200
          else
            render json: {
              message: 'Could not create download',
              data: download
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
          download = Download.find(params[:id])
          download.destroy
          render json: {
            message: 'Deleted download',
            data: download
          }, status: 200
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
      end

      def update
        download_param = params[:dl]
        if download_param
          download = Download.find(params[:id])
          download.download_count = download.download_count + 1
          download.save
        elsif current_user
          download = Download.find(params[:id])
          if download.update(download_params)
            render json: {
              message: 'Updated download',
              data: download
            }, status: 200
          else
            render json: {
              message: 'Could not update download',
              data: download
            }, status: 400
          end
        else
          render json: {
            message: 'Unauthorized',
            data: nil
          }, status: 401
        end
      end

      def download_params
        params.require(:download).permit(:os_type, :application_name, :path, :file_name, :file_size, :download_count)
      end
    end
  end
end
