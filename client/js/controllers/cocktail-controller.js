var app = angular.module("cocktail",[]);

app.controller("cocktailController", ["$scope", "$http", function($scope, $http){
	$scope.ingredients = [];
	$scope.getIngredients = function(){
		$http({
  			method: 'GET',
  			url: '/api/ingredients'
		}).then(function successCallback(response) {
	    	$scope.ingredients = response.data;
	  	}, function errorCallback(response) {
	    	console.log(response);
	  	});
	}
	$scope.update = function(ingredient){
		$http({
  			method: 'GET',
  			url: '/api/update_availability/'+ingredient._id+'/'+ingredient.have
		}).then(function successCallback(response) {
	    	console.log(response)
	  	}, function errorCallback(response) {
	    	console.log(response);
	  	});
	}
	$scope.getIngredients();
}]);