class CreateTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :artist_id
      t.string :spotify_track_id
      t.string :spotify_album_id

      t.timestamps
    end
  end
end
