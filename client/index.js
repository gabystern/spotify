$(document).ready(function() {
    console.log( "ready!" );
    tokenValidation()
    artistSearch()
});

function tokenValidation(){
  $.ajax({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      data: {
        grant_type: "client_credentials"
      },
      headers: {
        authorization: "Basic 2bdb493717ad4a2398cb48f7856ab585: b01f1e3f0b054a0e8ef6ffa0af7f5813"
      },
      success: function(result) {
        console.log(results)
      },
  });
}

function artistSearch(){
  $('form#artist-search').on('submit', function(event){
    event.preventDefault()
    console.log("Submitted Form!")
    const query = $("#query").val()
    var url = `https://api.spotify.com/v1/search?q=${query}&type=artist`
    $('#query').val()
    $.ajax({
      url: url,
      headers: {
        "Authorization": "Bearer " + "b01f1e3f0b054a0e8ef6ffa0af7f5813"
      },
      success: function(data){
        let artistId = data.artists.items[0].id
        getGenres(data)
        getAlbumCovers(data)
        getArtistInfo(artistId)
      }
    })
  })
}


function getGenres(data){
  let albums = data.artists.items
  let allgenres = albums.filter(function(album){
    return album.genres.length > 0
  })
  let flattengenres = allgenres.map(function(genre){
    return genre.genres
  })
  let finalgenres = flattengenres.reduce(function(a,b){
    return a.concat(b);})
  let lis = finalgenres.map(function(genre){
    return '<li>'+ genre +'</li>'
  })
  $('#genres-title').html("Genres")
  $('#genres').html(lis)
}

function getAlbumCovers(data){
  let artistName = data.artists.items[0].name
  let artistURL = data.artists.items[0].external_urls.spotify
  let spotifyUrl = '<a style="font-size:30px" href='+artistURL+'>'+artistName+'</a>'
  let albums = data.artists.items
  let allcovers = albums.filter(function(album){
    return album.images.length > 0
  })
  let covers = allcovers.map(function(cover){
    return cover.images[0]
  })
  let urls = covers.map(function(cover){
      return cover.url
  })
  let lis = urls.map(function(url){
    return '<img src='+url+' class="img-thumbnail" alt="Responsive image">'
  })
  $('#albums').html(lis)
  $('#artist-name').html(`${spotifyUrl}`)
}

// spotify_token = RestClient.post("https://accounts.spotify.com/api/token",{"grant_type": "client_credentials"}, {"Authorization": "Basic 2994250bb6b14cc8945209cb5b12d46a"})
//
// parsed_token = JSON.parse(spotify_token)

function getArtistInfo(artistId){
  var url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`
  $.ajax({
    url: url,
    headers: {
      "Authorization": "Bearer " + "b01f1e3f0b054a0e8ef6ffa0af7f5813"
    },
    success: function(data){
      let tracks = data.tracks.map(function(track){
        return track.name
      })
      let lis = tracks.map(function(track){
        return '<li>'+ track +'</li>'
      })
      $('#songs-title').html("Top 10 Tracks")
      $('#top-songs').html(lis)
    }
  })
}
