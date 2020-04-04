module Api
    module V1
      class DownloadController < ApplicationController

        def index
            downloads = Download.order('created_at DESC')
            render json: {
              status: 'SUCCESS',
              message: 'Loaded downloads',
              data: downloads
            }, status: :ok
          end
          def show
            download = Download.find(params[:id])
            render json: {
              status: 'SUCCESS',
              message: 'Loaded download',
              data: download
            }, status: :ok
          end
    
          def create
            download = Download.new(download_params)
            if download.save
              render json: {
                status: 'SUCCESS',
                message: 'Created download',
                data: download
              }, status: :ok
            else
              render json: {
                status: 'ERROR',
                message: 'Could not create download',
                data: download
              }, status: :unprocessable_entity
            end
          end
    
          def destroy
            download = Download.find(params[:id])
            download.destroy
            render json: {
              status: 'SUCCESS',
              message: 'Deleted download',
              data: download
            }, status: :ok
          end
    
          def update
            download = Download.find(params[:id])
            if download.update(download_params)
              render json: {
                status: 'SUCCESS',
                message: 'Updated download',
                data: download
              }, status: :ok
            else
              render json: {
                status: 'ERROR',
                message: 'Could not update download',
                data: download
              }, status: :unprocessable_entity
            end
          end

          def download_params
            params.permit(:os_type, :application_name, :path)
          end
      end
    end
end