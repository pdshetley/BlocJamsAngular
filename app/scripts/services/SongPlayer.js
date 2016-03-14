(function() {
     function SongPlayer() {
          var SongPlayer = {};
         
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.SongPlayer.SongPlayer.currentSong.playing = song;
      };
         
          /**
 * @desc Active song object from list of songs
 * @type {Object}
 */
          SongPlayer.SongPlayer.SongPlayer.SongPlayer.currentSong = null;
    }
         

          SongPlayer.play = function(song) {
              if (SongPlayer.SongPlayer.currentSong.playing !== song) {
                  
              setSong(song);
              currentBuzzObject.play();
              song.playing = true;
          } else if (SongPlayer.SongPlayer.currentSong.playing === song) {
              if (currentBuzzOject.isPaused()) {
                  currentBuzzObject.play();
                }
          }
   };
         
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };
     
 /**
         var playSong = function()
         currentBuzzObject.play();
         song.playing = true;
     };
*/
         
   return SongPlayer;
}
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();