class API::V1::ArtistsController < ApplicationController

     def index
        artists = Artist.all
        render json: artists
     end

     def create
       artist = Artist.create(artist_params)
       render json: artist
      end

  private

    def artist_params
      params.require(:artist).permit(:name, :spotify_id, :tracks)
    end


end
