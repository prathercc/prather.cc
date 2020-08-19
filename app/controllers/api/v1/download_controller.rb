# frozen_string_literal: true

module Api
  module V1
    class DownloadController < ApplicationController
      def index
        sort_by = params[:sort_by]
        sort_dir = params[:sort_dir]
        software = Software.find(params[:software_id])
        if software
          if sort_by && sort_dir
            downloads = software.downloads.order(sort_by + ' ' + sort_dir)
          else
            downloads = software.downloads.all.sort_by(&:os_type)
          end
          if downloads
            render json: {
              message: 'Loaded downloads',
              data: downloads
            }, status: 200
          else
            render json: {
              message: 'No downloads found with given software id',
              data: nil
            }, status: 400
          end
        else
          render json: {
            message: 'No software found with given id',
            data: nil
          }, status: 404
        end
      end

      def show
        download = Download.find(params[:id])
        if download
          render json: {
            message: 'Loaded download',
            data: download
          }, status: 200
        else
          render json: {
            message: 'Download with given id not found',
            data: nil
          }, status: 400
        end
      end

      def create
        if current_user[:group] == 'Administrator'
          software = Software.find(params[:software_id])
          download = software.downloads.create(download_params)
          render json: {
            message: 'Created download',
            data: download
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
        if current_user[:group] == 'Administrator'
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
        params.require(:download).permit(:os_type, :application_name, :path, :file_name, :file_size, :software_id, :download_description)
      end
    end
  end
end
