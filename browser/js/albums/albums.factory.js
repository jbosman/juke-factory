'use strict'

juke.factory("AlbumsFactory", function($http){

	var returnObj = {};

	returnObj.fetchAll = function(){
		return $http.get('/api/albums/')
  			.then(function (res) { return res.data; })
	};

	return returnObj;
});