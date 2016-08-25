'use strict';

juke.factory('PlayerFactory', function(ß){
  // non-UI logic in here
  var playerFactoryObj = {};

  // state
  var currentSong = null;
  var isPlaying = false;
  var audio = document.createElement('audio');
  var albumList;
  var progress;

  	audio.addEventListener('timeupdate', function () {
	    progress = 100 * audio.currentTime / audio.duration;
	    // $rootscope.$digest(); // re-computes current template only (this scope)
	    $rootscope.$evalAsync(); // likely best, schedules digest if none happening
  	});

	playerFactoryObj.start = function(song, songList){
		console.log(song);
		// Stop the existing audio
		this.pause();
		isPlaying = true;
		albumList = songList;
		// resume current song
		if (song === currentSong)
			this.resume();
		else{
			//enable laoding of new song
			currentSong = song;
	    	audio.src = song.audioUrl;
	    	audio.load();
	    	audio.play();
    	}
	}  

	playerFactoryObj.pause = function(){
		audio.pause();
		isPlaying = false;
	}  

	playerFactoryObj.resume = function(){
		audio.play();
		isPlaying = true;
	}  

	playerFactoryObj.isPlaying = function(){
		return isPlaying;
	}  

	playerFactoryObj.getCurrentSong = function(){
		return currentSong;
	}  

	playerFactoryObj.next = function(){
		// Grab the current song index
		var nextSongIndex = albumList.indexOf(currentSong) + 1;
		// Wrap around to beginning if we go to the end
		var nextSongIndex =  nextSongIndex % albumList.length;

		this.start(albumList[nextSongIndex]);
	}  

	playerFactoryObj.previous = function(){
		// Grab the current song index
		var nextSongIndex = albumList.indexOf(currentSong) - 1;
		// Wrap around to beginning if we go to the end
		if( nextSongIndex < 0 )
			nextSongIndex = albumList.length - 1;

		this.start(albumList[nextSongIndex]);
	}  

	playerFactoryObj.getProgress = function(){
		return progress;
	}  



  return playerFactoryObj;

});
