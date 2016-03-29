(function () {
  function Fixtures() {
         var Fixtures = {};
         
         var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: '/assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', duration: 161.71, audioUrl: '/assets/music/bloc_jams_music/blue' },
         { name: 'Green', duration: 103.96, audioUrl: '/assets/music/bloc_jams_music/green' },
         { name: 'Red', duration: 268.45, audioUrl: '/assets/music/bloc_jams_music/red' },
         { name: 'Pink', duration: 153.14, audioUrl: '/assets/music/bloc_jams_music/pink' },
         { name: 'Magenta', duration: 374.22, audioUrl: '/assets/music/bloc_jams_music/magenta' }  
     ]
 };

var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: '/assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', duration: '1:01' },
         { name: 'Ring, ring, ring', duration: '5:01' },
         { name: 'Fits in your pocket', duration: '3:21'},
         { name: 'Can you hear me now?', duration: '3:14' },
         { name: 'Wrong phone number', duration: '2:15'}
     ]
 };
         
  Fixtures.getAlbum = function() {
      return albumPicasso;
  };
         
    Fixtures.getCollection = function(numberOfAlbums) {
         var albums = [];
        
        for (var i=0; i < numberOfAlbums; i++) {
            albums.push(angular.copy(albumPicasso));
        }
        
        return albums;
    }
         
  return Fixtures;
}
    
 
     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();