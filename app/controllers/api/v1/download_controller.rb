# frozen_string_literal: true

module Api
  module V1
    class DownloadController < ApplicationController
      skip_before_action :verify_authenticity_token
      def index
        app_name = params[:application_name]
        downloads = Download.order('created_at DESC')
        if !app_name.nil?
          filtered_downloads = []

          downloads.each do |d|
            filtered_downloads.push(d) if d.application_name == app_name
          end
          render json: {
            status: 'SUCCESS',
            message: "Retrieved downloads for '#{app_name}'",
            data: filtered_downloads
          }, status: 200
        else
          render json: {
            status: 'SUCCESS',
            message: 'Loaded downloads',
            data: downloads
          }, status: 200
        end
      end

      def show
        download = Download.find(params[:id])
        render json: {
          status: 'SUCCESS',
          message: 'Loaded download',
          data: download
        }, status: 200
      end

      def create
        download = Download.new(download_params)
        if download.save
          render json: {
            status: 'SUCCESS',
            message: 'Created download',
            data: download
          }, status: 200
        else
          render json: {
            status: 'ERROR',
            message: 'Could not create download',
            data: download
          }, status: 400
        end
      end

      def destroy
        download = Download.find(params[:id])
        download.destroy
        render json: {
          status: 'SUCCESS',
          message: 'Deleted download',
          data: download
        }, status: 200
      end

      def update
        download = Download.find(params[:id])
        if download.update(download_params)
          render json: {
            status: 'SUCCESS',
            message: 'Updated download',
            data: download
          }, status: 200
        else
          render json: {
            status: 'ERROR',
            message: 'Could not update download',
            data: download
          }, status: 400
        end
      end

      def download_params
        params.require(:download).permit(:os_type, :application_name, :path, :file_name, :file_size)
      end
    end
  end
end
