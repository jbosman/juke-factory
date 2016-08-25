'use strict';

juke.factory("AblumFactory", function($http){

	var returnObj = {};

	returnObj.fetchOne = function(albums){
		return $http.get('/api/albums/' + albums[0].id) // temp: get one
  			.then(function (res) { return res.data; })
	}

	return returnObj;
});