(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
         // private attribute stores album information
        var currentAlbum = Fixtures.getAlbum();
        SongPlayer.currentAlbum = currentAlbum;
         
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
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
        };
         
         /** 
         * @function playSong
         * @desc Play a song
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        /** 
         * @function stopSong
         * @desc Stops a song
         * @param {Object} song
         **/
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = false;
        };
        
         /** 
         * @function getSongIndex
         * @desc Get index of song in the songs array
         * @param {Object} song
         * @returns {Number}
         **/
        // This function will get the index of a song
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);  
        };
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        //This is now a public attribute so we can use it within the player bar.
        SongPlayer.currentSong = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         **/
        SongPlayer.play = function(song) {
            /* We use || to tell the function: assign (1) the value of song or (2) the value of SongPlayer.currentSong to the song variable. The first condition occurs when we call the methods from the Album view's song rows, and the second condition occurs when we call the methods from the player bar. */
            song = song || SongPlayer.currentSong;
            
            if (song === undefined && song === null) {
                return;
            }
            
            if (SongPlayer.currentSong !== song) {
                
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
         /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         **/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            // To test this, I've chosen the current number of songs: 5. Not sure what .length I should be testing here.
            if (currentSongIndex >= currentAlbum.songs.length) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         
             /**
             * @function setCurrentTime
             * @desc Set current time (in seconds) of currently playing song
             * @param {Number} time
             */
             SongPlayer.setCurrentTime = function(time) {
                 if (currentBuzzObject) {
                     currentBuzzObject.setTime(time);
                 }
            };
        
        return SongPlayer;
    }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();