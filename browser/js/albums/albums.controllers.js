'use strict'

juke.controller("AblumsController", function($scope, AlbumsFactory){

	AlbumsFactory.fetchAll()
  		.then(function (albums) {
    		albums.forEach(function(album){
    			album.imageUrl = '/api/albums/' + album.id + '/image';
    			album.numOfSongs = album.songs.length;
    				album.songs.forEach(function (song, i) {
      				song.audioUrl = '/api/songs/' + song.id + '/audio';
      				song.albumIndex = i;
    			});
    		});
    		$scope.albums = albums;
  		});
  		

});